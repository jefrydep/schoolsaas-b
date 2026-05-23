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
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const teacher_entity_1 = require("./teacher.entity");
const base_service_1 = require("../../common/base/base.service");
const tenant_context_1 = require("../../common/utils/tenant-context");
let TeachersService = class TeachersService extends base_service_1.BaseService {
    teacherRepository;
    constructor(teacherRepository) {
        super(teacherRepository);
        this.teacherRepository = teacherRepository;
    }
    async create(dto) {
        const tenantId = (0, tenant_context_1.getCurrentTenantId)();
        const existing = await this.teacherRepository.findOne({
            where: { teacherCode: dto.teacherCode, tenantId },
        });
        if (existing) {
            throw new common_1.ConflictException('Teacher code already exists in this tenant');
        }
        return super.create(dto);
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map