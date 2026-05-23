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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("./user.entity");
const super_admin_entity_1 = require("../auth/super-admin.entity");
const base_service_1 = require("../../common/base/base.service");
const role_enum_1 = require("../../common/enums/role.enum");
const tenant_context_1 = require("../../common/utils/tenant-context");
let UsersService = class UsersService extends base_service_1.BaseService {
    userRepository;
    superAdminRepository;
    constructor(userRepository, superAdminRepository) {
        super(userRepository);
        this.userRepository = userRepository;
        this.superAdminRepository = superAdminRepository;
    }
    async create(dto) {
        const tenantId = (0, tenant_context_1.getCurrentTenantId)();
        const role = (0, tenant_context_1.getCurrentRole)();
        const isSuperAdmin = role === role_enum_1.Role.SUPER_ADMIN;
        const targetRole = dto.role || role_enum_1.Role.ESTUDIANTE;
        if (!isSuperAdmin && targetRole === role_enum_1.Role.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('Only SuperAdmin can create SuperAdmin users');
        }
        if (isSuperAdmin && !tenantId) {
            throw new common_1.ForbiddenException('SuperAdmin must specify tenant context');
        }
        const superAdminExists = await this.superAdminRepository.findOne({
            where: { email: dto.email },
        });
        if (superAdminExists) {
            throw new common_1.ConflictException('Email already registered as SuperAdmin');
        }
        const existing = await this.userRepository.findOne({
            where: { email: dto.email, tenantId },
        });
        if (existing) {
            throw new common_1.ConflictException('Email already registered in this tenant');
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
    async findByEmail(email) {
        const tenantId = (0, tenant_context_1.getCurrentTenantId)();
        return this.userRepository.findOne({
            where: tenantId ? { email, tenantId } : { email },
        });
    }
    async emailExistsInAnyTenant(email) {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        return !!user;
    }
    async findByEmailWithPassword(email, tenantId) {
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
    async createWithTenant(dto) {
        const superAdminExists = await this.superAdminRepository.findOne({
            where: { email: dto.email },
        });
        if (superAdminExists) {
            throw new common_1.ConflictException('Email already registered as SuperAdmin');
        }
        const existing = await this.userRepository.findOne({
            where: { email: dto.email, tenantId: dto.tenantId },
        });
        if (existing) {
            throw new common_1.ConflictException('Email already registered in this tenant');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({
            email: dto.email,
            passwordHash,
            firstName: dto.firstName,
            lastName: dto.lastName,
            role: dto.role || role_enum_1.Role.ESTUDIANTE,
            tenantId: dto.tenantId,
        });
        return this.userRepository.save(user);
    }
    async updatePassword(id, newPassword) {
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await this.userRepository.update(id, { passwordHash });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(super_admin_entity_1.SuperAdmin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map