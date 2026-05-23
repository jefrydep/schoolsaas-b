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
exports.GradesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const grade_entity_1 = require("./grade.entity");
const base_service_1 = require("../../common/base/base.service");
const tenant_context_1 = require("../../common/utils/tenant-context");
const average_calculator_1 = require("./utils/average-calculator");
const evaluations_service_1 = require("../evaluations/evaluations.service");
let GradesService = class GradesService extends base_service_1.BaseService {
    gradeRepository;
    evaluationsService;
    constructor(gradeRepository, evaluationsService) {
        super(gradeRepository);
        this.gradeRepository = gradeRepository;
        this.evaluationsService = evaluationsService;
    }
    async create(dto) {
        await this.evaluationsService.findOne(dto.evaluationId);
        return super.create(dto);
    }
    async findByEvaluation(evaluationId) {
        const tenantId = (0, tenant_context_1.getCurrentTenantId)();
        return this.gradeRepository.find({
            where: { evaluationId, tenantId },
        });
    }
    async findByStudent(studentId) {
        const tenantId = (0, tenant_context_1.getCurrentTenantId)();
        return this.gradeRepository.find({
            where: { studentId, tenantId },
        });
    }
    async getStudentCourseAverage(studentId, courseId) {
        const tenantId = (0, tenant_context_1.getCurrentTenantId)();
        const evaluations = await this.evaluationsService.findByCourse(courseId);
        if (evaluations.length === 0) {
            return { average: 0, totalGrades: 0 };
        }
        const evaluationIds = evaluations.map((e) => e.id);
        const grades = await this.gradeRepository.find({
            where: {
                studentId,
                tenantId,
            },
        });
        const filteredGrades = grades.filter((g) => evaluationIds.includes(g.evaluationId));
        if (filteredGrades.length === 0) {
            return { average: 0, totalGrades: 0 };
        }
        const gradeData = filteredGrades.map((g) => {
            const evaluation = evaluations.find((e) => e.id === g.evaluationId);
            return {
                score: Number(g.score),
                weight: evaluation ? Number(evaluation.weight) : 0,
            };
        });
        const average = (0, average_calculator_1.calculateWeightedAverage)(gradeData);
        return { average, totalGrades: filteredGrades.length };
    }
};
exports.GradesService = GradesService;
exports.GradesService = GradesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(grade_entity_1.Grade)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        evaluations_service_1.EvaluationsService])
], GradesService);
//# sourceMappingURL=grades.service.js.map