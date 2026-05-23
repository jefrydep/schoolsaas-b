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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardStatsDto = exports.TenantStatsDto = exports.GlobalStatsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GlobalStatsDto {
    totalTenants;
    activeTenants;
    totalStudents;
    totalTeachers;
    totalCourses;
    totalEvaluations;
}
exports.GlobalStatsDto = GlobalStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GlobalStatsDto.prototype, "totalTenants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GlobalStatsDto.prototype, "activeTenants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GlobalStatsDto.prototype, "totalStudents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GlobalStatsDto.prototype, "totalTeachers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GlobalStatsDto.prototype, "totalCourses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GlobalStatsDto.prototype, "totalEvaluations", void 0);
class TenantStatsDto {
    tenantId;
    tenantName;
    studentCount;
    teacherCount;
    courseCount;
    evaluationCount;
}
exports.TenantStatsDto = TenantStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TenantStatsDto.prototype, "tenantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TenantStatsDto.prototype, "tenantName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TenantStatsDto.prototype, "studentCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TenantStatsDto.prototype, "teacherCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TenantStatsDto.prototype, "courseCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TenantStatsDto.prototype, "evaluationCount", void 0);
class DashboardStatsDto {
    global;
    byTenant;
}
exports.DashboardStatsDto = DashboardStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: GlobalStatsDto }),
    __metadata("design:type", GlobalStatsDto)
], DashboardStatsDto.prototype, "global", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TenantStatsDto] }),
    __metadata("design:type", Array)
], DashboardStatsDto.prototype, "byTenant", void 0);
//# sourceMappingURL=stats.dto.js.map