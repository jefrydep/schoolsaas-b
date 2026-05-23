import { OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { TenantsService } from '../tenants/tenants.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Role } from '../../common/enums/role.enum';
import { SuperAdminsService } from './super-admins.service';
import { PasswordResetToken } from './password-reset-token.entity';
import { EmailService } from './email.service';
export interface JwtPayload {
    sub: string;
    email: string;
    role: Role;
    tenantId: string | null;
}
export declare class AuthService implements OnModuleInit {
    private readonly usersService;
    private readonly tenantsService;
    private readonly jwtService;
    private readonly superAdminsService;
    private readonly passwordResetTokenRepository;
    private readonly emailService;
    constructor(usersService: UsersService, tenantsService: TenantsService, jwtService: JwtService, superAdminsService: SuperAdminsService, passwordResetTokenRepository: Repository<PasswordResetToken>, emailService: EmailService);
    onModuleInit(): Promise<void>;
    login(dto: LoginDto, res: Response): Promise<{
        accessToken: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            tenantId: any;
            tenant: {
                id: string;
                name: string;
                subdomain: string;
            } | null;
        };
    }>;
    register(dto: RegisterDto, res: Response): Promise<{
        accessToken: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            tenantId: any;
            tenant: {
                id: string;
                name: string;
                subdomain: string;
            } | null;
        };
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    verifySuperAdminPassword(superAdminId: string, password: string): Promise<{
        valid: boolean;
    }>;
    private generateAuthResponse;
}
