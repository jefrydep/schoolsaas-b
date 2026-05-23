import {
  Injectable,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { SuperAdmin } from '../auth/super-admin.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from '../../common/base/base.service';
import { Role } from '../../common/enums/role.enum';
import {
  getCurrentRole,
  getCurrentTenantId,
} from '../../common/utils/tenant-context';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SuperAdmin)
    private readonly superAdminRepository: Repository<SuperAdmin>,
  ) {
    super(userRepository);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const tenantId = getCurrentTenantId();
    const role = getCurrentRole();

    const isSuperAdmin = role === Role.SUPER_ADMIN;
    const targetRole = dto.role || Role.ESTUDIANTE;

    if (!isSuperAdmin && targetRole === Role.SUPER_ADMIN) {
      throw new ForbiddenException(
        'Only SuperAdmin can create SuperAdmin users',
      );
    }

    if (isSuperAdmin && !tenantId) {
      throw new ForbiddenException('SuperAdmin must specify tenant context');
    }

    const superAdminExists = await this.superAdminRepository.findOne({
      where: { email: dto.email },
    });
    if (superAdminExists) {
      throw new ConflictException('Email already registered as SuperAdmin');
    }

    const existing = await this.userRepository.findOne({
      where: { email: dto.email, tenantId },
    });
    if (existing) {
      throw new ConflictException('Email already registered in this tenant');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      email: dto.email,
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: targetRole,
      tenantId,
    });

    return this.userRepository.save(user);
  }

async findByEmail(email: string): Promise<User | null> {
    const tenantId = getCurrentTenantId();
    return this.userRepository.findOne({
      where: tenantId ? { email, tenantId } : { email },
    });
  }

  async emailExistsInAnyTenant(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return !!user;
  }

  async findByEmailWithPassword(
    email: string,
    tenantId?: string,
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: tenantId ? { email, tenantId } : { email },
      select: [
        'id',
        'email',
        'passwordHash',
        'role',
        'tenantId',
        'firstName',
        'lastName',
        'isActive',
      ],
    });
  }

  async createWithTenant(dto: CreateUserDto): Promise<User> {
    const superAdminExists = await this.superAdminRepository.findOne({
      where: { email: dto.email },
    });
    if (superAdminExists) {
      throw new ConflictException('Email already registered as SuperAdmin');
    }

    const existing = await this.userRepository.findOne({
      where: { email: dto.email, tenantId: dto.tenantId },
    });
    if (existing) {
      throw new ConflictException('Email already registered in this tenant');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      email: dto.email,
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: dto.role || Role.ESTUDIANTE,
      tenantId: dto.tenantId,
    });

    return this.userRepository.save(user);
  }

  async updatePassword(id: string, newPassword: string): Promise<void> {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(id, { passwordHash });
  }
}
