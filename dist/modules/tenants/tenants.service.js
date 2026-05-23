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
exports.TenantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const tenant_entity_1 = require("./tenant.entity");
const user_entity_1 = require("../users/user.entity");
const role_enum_1 = require("../../common/enums/role.enum");
let TenantsService = class TenantsService {
    tenantRepository;
    userRepository;
    constructor(tenantRepository, userRepository) {
        this.tenantRepository = tenantRepository;
        this.userRepository = userRepository;
    }
    async create(dto) {
        const existing = await this.tenantRepository.findOne({
            where: { subdomain: dto.subdomain },
        });
        if (existing) {
            throw new common_1.ConflictException('Subdomain already in use');
        }
        const tenant = this.tenantRepository.create({
            name: dto.name,
            subdomain: dto.subdomain,
            legalName: dto.legalName,
            ruc: dto.ruc,
            modularCode: dto.modularCode,
            type: dto.type,
            level: dto.level,
            address: dto.address,
            district: dto.district,
            province: dto.province,
            department: dto.department,
            phone: dto.phone,
            email: dto.email,
            directorName: dto.directorName,
            logo: dto.logo,
            isActive: dto.isActive ?? true,
            settings: dto.settings,
        });
        const savedTenant = await this.tenantRepository.save(tenant);
        const passwordHash = await bcrypt.hash(dto.admin.password, 10);
        const admin = this.userRepository.create({
            email: dto.admin.email,
            passwordHash,
            firstName: dto.admin.firstName,
            lastName: dto.admin.lastName,
            role: role_enum_1.Role.ADMIN,
            tenantId: savedTenant.id,
        });
        const savedAdmin = await this.userRepository.save(admin);
        return { tenant: savedTenant, admin: savedAdmin };
    }
    async findAll() {
        return this.tenantRepository.find();
    }
    async findOne(id) {
        const tenant = await this.tenantRepository.findOne({ where: { id } });
        if (!tenant)
            throw new common_1.NotFoundException('Tenant not found');
        return tenant;
    }
    async update(id, dto) {
        const tenant = await this.findOne(id);
        Object.assign(tenant, dto);
        return this.tenantRepository.save(tenant);
    }
    async remove(id) {
        const tenant = await this.findOne(id);
        await this.tenantRepository.remove(tenant);
    }
    async findBySubdomain(subdomain) {
        return this.tenantRepository.findOne({ where: { subdomain } });
    }
};
exports.TenantsService = TenantsService;
exports.TenantsService = TenantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TenantsService);
//# sourceMappingURL=tenants.service.js.map