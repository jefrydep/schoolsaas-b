import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
declare class VerifyPasswordDto {
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    verifyPassword(req: any, dto: VerifyPasswordDto): Promise<{
        valid: boolean;
    }>;
    logout(res: Response): Response<any, Record<string, any>>;
}
export {};
