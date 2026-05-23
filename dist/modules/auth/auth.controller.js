"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
const class_validator_1 = require("class-validator");
class VerifyPasswordDto {
    password;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyPasswordDto.prototype, "password", void 0);
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    login(dto, res) {
        return this.authService.login(dto, res);
    }
    register(dto, res) {
        return this.authService.register(dto, res);
    }
    forgotPassword(dto) {
        return this.authService.forgotPassword(dto);
    }
    resetPassword(dto) {
        return this.authService.resetPassword(dto);
    }
    async verifyPassword(req, dto) {
        return this.authService.verifySuperAdminPassword(req.user.id, dto.password);
    }
    logout(res) {
        res.clearCookie('access_token');
        return res.json({ message: 'Logged out successfully' });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Iniciar sesión',
        description: 'Autentica un usuario. Acepta tanto SuperAdmin como usuarios de tenant. Retorna token en cookie HttpOnly y en cuerpo de respuesta.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login exitoso',
        schema: {
            example: {
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                user: {
                    id: 'uuid-del-usuario',
                    email: 'usuario@ejemplo.com',
                    firstName: 'Juan',
                    lastName: 'Pérez',
                    role: 'ADMIN',
                    tenantId: 'uuid-del-tenant',
                },
            },
        },
        headers: {
            'Set-Cookie': {
                description: 'Cookie HttpOnly con el token de acceso',
                example: 'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Path=/; Max-Age=86400',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Credenciales inválidas' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Registrar usuario',
        description: 'Registra un nuevo usuario dentro del tenant por defecto. Retorna token en cookie HttpOnly y en cuerpo de respuesta.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Usuario registrado exitosamente',
        schema: {
            example: {
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                user: {
                    id: 'uuid-del-usuario',
                    email: 'usuario@ejemplo.com',
                    firstName: 'Juan',
                    lastName: 'Pérez',
                    role: 'ADMIN',
                    tenantId: 'uuid-del-tenant',
                },
            },
        },
        headers: {
            'Set-Cookie': {
                description: 'Cookie HttpOnly con el token de acceso',
                example: 'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Path=/; Max-Age=86400',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'El email ya está registrado' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Recuperar contraseña',
        description: 'Envía un email con el enlace para restablecer la contraseña.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Si el email existe, se envió el enlace de recuperación',
        schema: {
            example: {
                message: 'If the email exists, a reset link has been sent',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Restablecer contraseña',
        description: 'Restablece la contraseña usando el token recibido por email.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Contraseña restablecida exitosamente',
        schema: {
            example: {
                message: 'Password reset successfully',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Token inválido o expirado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('verify-password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Verificar contraseña de SuperAdmin',
        description: 'Verifica que la contraseña proporcionada es correcta del SuperAdmin logueado.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contraseña válida' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Contraseña incorrecta' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, VerifyPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyPassword", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Cerrar sesión', description: 'Elimina la cookie de autenticación.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sesión cerrada exitosamente' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Autenticación'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map