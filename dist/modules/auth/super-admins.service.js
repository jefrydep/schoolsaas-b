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
exports.SuperAdminsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const super_admin_entity_1 = require("./super-admin.entity");
const user_entity_1 = require("../users/user.entity");
let SuperAdminsService = class SuperAdminsService {
    superAdminRepository;
    userRepository;
    constructor(superAdminRepository, userRepository) {
        this.superAdminRepository = superAdminRepository;
        this.userRepository = userRepository;
    }
    async findByEmail(email) {
        return this.superAdminRepository.findOne({ where: { email } });
    }
    async emailExistsInUsers(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        return !!user;
    }
    async emailExists(email) {
        const superAdminExists = await this.findByEmail(email);
        if (superAdminExists)
            return true;
        return this.emailExistsInUsers(email);
    }
    async findOne(id) {
        const superAdmin = await this.superAdminRepository.findOne({ where: { id } });
        if (!superAdmin) {
            throw new common_1.NotFoundException('SuperAdmin not found');
        }
        return superAdmin;
    }
    async findByEmailWithPassword(email) {
        return this.superAdminRepository.findOne({
            where: { email },
            select: [
                'id',
                'email',
                'passwordHash',
                'firstName',
                'lastName',
                'isActive',
            ],
        });
    }
    async create(data) {
        if (await this.emailExists(data.email)) {
            throw new common_1.ConflictException('Email already registered as SuperAdmin or User');
        }
        const passwordHash = await bcrypt.hash(data.password, 10);
        const superAdmin = this.superAdminRepository.create({
            email: data.email,
            passwordHash,
            firstName: data.firstName,
            lastName: data.lastName,
        });
        return this.superAdminRepository.save(superAdmin);
    }
    async seedIfNotExists() {
        const email = process.env.SUPER_ADMIN_EMAIL || 'superadmin@vibecoding.com';
        const password = process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin123';
        const firstName = process.env.SUPER_ADMIN_FIRST_NAME || 'Super';
        const lastName = process.env.SUPER_ADMIN_LAST_NAME || 'Admin';
        const existing = await this.findByEmail(email);
        if (!existing) {
            await this.create({ email, password, firstName, lastName });
        }
    }
    async updatePassword(id, newPassword) {
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await this.superAdminRepository.update(id, { passwordHash });
    }
    async findAll() {
        return this.superAdminRepository.find({
            select: ['id', 'email', 'firstName', 'lastName', 'isActive', 'createdAt', 'updatedAt'],
        });
    }
    async update(id, data) {
        const superAdmin = await this.findOne(id);
        if (data.email && data.email !== superAdmin.email) {
            if (await this.emailExists(data.email)) {
                throw new common_1.ConflictException('Email already registered as SuperAdmin or User');
            }
        }
        if (data.email)
            superAdmin.email = data.email;
        if (data.firstName)
            superAdmin.firstName = data.firstName;
        if (data.lastName)
            superAdmin.lastName = data.lastName;
        if (data.isActive !== undefined)
            superAdmin.isActive = data.isActive;
        if (data.password) {
            superAdmin.passwordHash = await bcrypt.hash(data.password, 10);
        }
        return this.superAdminRepository.save(superAdmin);
    }
    async remove(id) {
        const superAdmin = await this.findOne(id);
        await this.superAdminRepository.remove(superAdmin);
    }
};
exports.SuperAdminsService = SuperAdminsService;
exports.SuperAdminsService = SuperAdminsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(super_admin_entity_1.SuperAdmin)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SuperAdminsService);
//# sourceMappingURL=super-admins.service.js.map