import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IsNull } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { TenantsService } from '../tenants/tenants.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Role } from '../../common/enums/role.enum';
import { getCurrentTenantId } from '../../common/utils/tenant-context';
import { SuperAdminsService } from './super-admins.service';
import { PasswordResetToken } from './password-reset-token.entity';
import { EmailService } from './email.service';

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
  tenantId: string | null;
}

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly tenantsService: TenantsService,
    private readonly jwtService: JwtService,
    private readonly superAdminsService: SuperAdminsService,
    @InjectRepository(PasswordResetToken)
    private readonly passwordResetTokenRepository: Repository<PasswordResetToken>,
    private readonly emailService: EmailService,
  ) {}

  async onModuleInit() {
    await this.superAdminsService.seedIfNotExists();
  }

  async login(dto: LoginDto) {
    const superAdmin = await this.superAdminsService.findByEmailWithPassword(
      dto.email,
    );

    if (superAdmin) {
      const isPasswordValid = await bcrypt.compare(
        dto.password,
        superAdmin.passwordHash,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      if (!superAdmin.isActive) {
        throw new UnauthorizedException('Account is disabled');
      }

      return {
        accessToken: this.jwtService.sign({
          sub: superAdmin.id,
          email: superAdmin.email,
          role: Role.SUPER_ADMIN,
          tenantId: null,
        }),
        user: {
          id: superAdmin.id,
          email: superAdmin.email,
          firstName: superAdmin.firstName,
          lastName: superAdmin.lastName,
          role: Role.SUPER_ADMIN,
          tenantId: null,
          tenant: null,
        },
      };
    }

    const currentTenantId = getCurrentTenantId();
    const user = await this.usersService.findByEmailWithPassword(
      dto.email,
      currentTenantId,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is disabled');
    }

    return this.generateAuthResponse(user);
  }

  async register(dto: RegisterDto) {
    const tenant = await this.tenantsService.findBySubdomain('default');

    if (!tenant) {
      const result = await this.tenantsService.create({
        name: 'Tenant Default',
        subdomain: 'default',
        admin: {
          email: dto.email,
          password: dto.password,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });
      return this.generateAuthResponse(result.admin);
    }

    const createUserDto: CreateUserDto = {
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: Role.ADMIN,
      tenantId: tenant.id,
    };

    const user = await this.usersService.createWithTenant(createUserDto);
    return this.generateAuthResponse(user);
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    let userType: 'superadmin' | 'user' | null = null;

    const superAdmin = await this.superAdminsService.findByEmail(dto.email);
    if (superAdmin) {
      userType = 'superadmin';
    } else {
      const user = await this.usersService.findByEmail(dto.email);
      if (user) {
        userType = 'user';
      }
    }

    if (!userType) {
      return { message: 'If the email exists, a reset link has been sent' };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const existingToken = await this.passwordResetTokenRepository.findOne({
      where: { email: dto.email, usedAt: IsNull() },
    });
    if (existingToken) {
      await this.passwordResetTokenRepository.remove(existingToken);
    }

    const passwordResetToken = this.passwordResetTokenRepository.create({
      email: dto.email,
      token,
      expiresAt,
      userId: null,
    });
    await this.passwordResetTokenRepository.save(passwordResetToken);

    await this.emailService.sendPasswordResetEmail(dto.email, token);

    return { message: 'If the email exists, a reset link has been sent' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const passwordResetToken = await this.passwordResetTokenRepository.findOne({
      where: { token: dto.token },
      order: { createdAt: 'DESC' },
    });

    if (!passwordResetToken) {
      throw new BadRequestException('Invalid token');
    }

    if (passwordResetToken.usedAt) {
      throw new BadRequestException('Token already used');
    }

    if (new Date() > passwordResetToken.expiresAt) {
      throw new BadRequestException('Token expired');
    }

    const superAdmin = await this.superAdminsService.findByEmail(
      passwordResetToken.email,
    );

    if (superAdmin) {
      await this.superAdminsService.updatePassword(
        superAdmin.id,
        dto.newPassword,
      );
    } else {
      const user = await this.usersService.findByEmail(
        passwordResetToken.email,
      );
      if (user) {
        await this.usersService.updatePassword(user.id, dto.newPassword);
      } else {
        throw new BadRequestException('User not found');
      }
    }

    passwordResetToken.usedAt = new Date();
    await this.passwordResetTokenRepository.save(passwordResetToken);

    return { message: 'Password reset successfully' };
  }

  async verifySuperAdminPassword(superAdminId: string, password: string): Promise<{ valid: boolean }> {
    const superAdmin = await this.superAdminsService.findOne(superAdminId);
    if (!superAdmin) {
      throw new UnauthorizedException('SuperAdmin not found');
    }

    const isPasswordValid = await bcrypt.compare(password, superAdmin.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return { valid: true };
  }

  private async generateAuthResponse(user: any) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    };

    let tenant = null;
    if (user.tenantId) {
      tenant = await this.tenantsService.findOne(user.tenantId);
    }

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        tenantId: user.tenantId,
        tenant: tenant
          ? { id: tenant.id, name: tenant.name, subdomain: tenant.subdomain }
          : null,
      },
    };
  }
}