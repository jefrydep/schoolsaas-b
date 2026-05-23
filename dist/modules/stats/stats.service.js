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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tenant_entity_1 = require("../tenants/tenant.entity");
const student_entity_1 = require("../students/student.entity");
const teacher_entity_1 = require("../teachers/teacher.entity");
const course_entity_1 = require("../courses/course.entity");
const evaluation_entity_1 = require("../evaluations/evaluation.entity");
let StatsService = class StatsService {
    tenantRepository;
    studentRepository;
    teacherRepository;
    courseRepository;
    evaluationRepository;
    constructor(tenantRepository, studentRepository, teacherRepository, courseRepository, evaluationRepository) {
        this.tenantRepository = tenantRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.courseRepository = courseRepository;
        this.evaluationRepository = evaluationRepository;
    }
    async getGlobalStats() {
        const [totalTenants, activeTenants, totalStudents, totalTeachers, totalCourses, totalEvaluations] = await Promise.all([
            this.tenantRepository.count(),
            this.tenantRepository.count({ where: { isActive: true } }),
            this.studentRepository.count(),
            this.teacherRepository.count(),
            this.courseRepository.count(),
            this.evaluationRepository.count(),
        ]);
        return {
            totalTenants,
            activeTenants,
            totalStudents,
            totalTeachers,
            totalCourses,
            totalEvaluations,
        };
    }
    async getStatsByTenant() {
        const tenants = await this.tenantRepository.find();
        const stats = [];
        for (const tenant of tenants) {
            const [studentCount, teacherCount, courseCount, evaluationCount] = await Promise.all([
                this.studentRepository.count({ where: { tenantId: tenant.id } }),
                this.teacherRepository.count({ where: { tenantId: tenant.id } }),
                this.courseRepository.count({ where: { tenantId: tenant.id } }),
                this.evaluationRepository.count({ where: { tenantId: tenant.id } }),
            ]);
            stats.push({
                tenantId: tenant.id,
                tenantName: tenant.name,
                studentCount,
                teacherCount,
                courseCount,
                evaluationCount,
            });
        }
        return stats;
    }
    async getDashboardStats() {
        const [global, byTenant] = await Promise.all([
            this.getGlobalStats(),
            this.getStatsByTenant(),
        ]);
        return { global, byTenant };
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(3, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(4, (0, typeorm_1.InjectRepository)(evaluation_entity_1.Evaluation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StatsService);
//# sourceMappingURL=stats.service.js.map