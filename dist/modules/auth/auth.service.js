"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const users_service_1 = require("../users/users.service");
const tenants_service_1 = require("../tenants/tenants.service");
const role_enum_1 = require("../../common/enums/role.enum");
const tenant_context_1 = require("../../common/utils/tenant-context");
const super_admins_service_1 = require("./super-admins.service");
const password_reset_token_entity_1 = require("./password-reset-token.entity");
const email_service_1 = require("./email.service");
let AuthService = class AuthService {
    usersService;
    tenantsService;
    jwtService;
    superAdminsService;
    passwordResetTokenRepository;
    emailService;
    constructor(usersService, tenantsService, jwtService, superAdminsService, passwordResetTokenRepository, emailService) {
        this.usersService = usersService;
        this.tenantsService = tenantsService;
        this.jwtService = jwtService;
        this.superAdminsService = superAdminsService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.emailService = emailService;
    }
    async onModuleInit() {
        await this.superAdminsService.seedIfNotExists();
    }
    async login(dto, res) {
        const superAdmin = await this.superAdminsService.findByEmailWithPassword(dto.email);
        if (superAdmin) {
            const isPasswordValid = await bcrypt.compare(dto.password, superAdmin.passwordHash);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            if (!superAdmin.isActive) {
                throw new common_1.UnauthorizedException('Account is disabled');
            }
            const token = this.jwtService.sign({
                sub: superAdmin.id,
                email: superAdmin.email,
                role: role_enum_1.Role.SUPER_ADMIN,
                tenantId: null,
            });
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000,
            });
            return {
                accessToken: token,
                user: {
                    id: superAdmin.id,
                    email: superAdmin.email,
                    firstName: superAdmin.firstName,
                    lastName: superAdmin.lastName,
                    role: role_enum_1.Role.SUPER_ADMIN,
                    tenantId: null,
                    tenant: null,
                },
            };
        }
        const currentTenantId = (0, tenant_context_1.getCurrentTenantId)();
        const user = await this.usersService.findByEmailWithPassword(dto.email, currentTenantId);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Account is disabled');
        }
        return this.generateAuthResponse(user, res);
    }
    async register(dto, res) {
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
            return this.generateAuthResponse(result.admin, res);
        }
        const createUserDto = {
            email: dto.email,
            password: dto.password,
            firstName: dto.firstName,
            lastName: dto.lastName,
            role: role_enum_1.Role.ADMIN,
            tenantId: tenant.id,
        };
        const user = await this.usersService.createWithTenant(createUserDto);
        return this.generateAuthResponse(user, res);
    }
    async forgotPassword(dto) {
        let userType = null;
        const superAdmin = await this.superAdminsService.findByEmail(dto.email);
        if (superAdmin) {
            userType = 'superadmin';
        }
        else {
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
            where: { email: dto.email, usedAt: (0, typeorm_3.IsNull)() },
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
    async resetPassword(dto) {
        const passwordResetToken = await this.passwordResetTokenRepository.findOne({
            where: { token: dto.token },
            order: { createdAt: 'DESC' },
        });
        if (!passwordResetToken) {
            throw new common_1.BadRequestException('Invalid token');
        }
        if (passwordResetToken.usedAt) {
            throw new common_1.BadRequestException('Token already used');
        }
        if (new Date() > passwordResetToken.expiresAt) {
            throw new common_1.BadRequestException('Token expired');
        }
        const superAdmin = await this.superAdminsService.findByEmail(passwordResetToken.email);
        if (superAdmin) {
            await this.superAdminsService.updatePassword(superAdmin.id, dto.newPassword);
        }
        else {
            const user = await this.usersService.findByEmail(passwordResetToken.email);
            if (user) {
                await this.usersService.updatePassword(user.id, dto.newPassword);
            }
            else {
                throw new common_1.BadRequestException('User not found');
            }
        }
        passwordResetToken.usedAt = new Date();
        await this.passwordResetTokenRepository.save(passwordResetToken);
        return { message: 'Password reset successfully' };
    }
    async verifySuperAdminPassword(superAdminId, password) {
        const superAdmin = await this.superAdminsService.findOne(superAdminId);
        if (!superAdmin) {
            throw new common_1.UnauthorizedException('SuperAdmin not found');
        }
        const isPasswordValid = await bcrypt.compare(password, superAdmin.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        return { valid: true };
    }
    async generateAuthResponse(user, res) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
        };
        let tenant = null;
        if (user.tenantId) {
            tenant = await this.tenantsService.findOne(user.tenantId);
        }
        const token = this.jwtService.sign(payload);
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });
        return {
            accessToken: token,
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, typeorm_1.InjectRepository)(password_reset_token_entity_1.PasswordResetToken)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        tenants_service_1.TenantsService,
        jwt_1.JwtService,
        super_admins_service_1.SuperAdminsService,
        typeorm_2.Repository,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map