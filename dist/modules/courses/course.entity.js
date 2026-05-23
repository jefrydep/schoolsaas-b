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
exports.Course = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/base/base.entity");
let Course = class Course extends base_entity_1.BaseEntity {
    teacherId;
    name;
    code;
    description;
    academicPeriod;
    credits;
    maxStudents;
    isActive;
};
exports.Course = Course;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'teacher_id', nullable: true }),
    __metadata("design:type", Object)
], Course.prototype, "teacherId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Course.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Course.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, name: 'academic_period' }),
    __metadata("design:type", String)
], Course.prototype, "academicPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Course.prototype, "credits", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 30, name: 'max_students' }),
    __metadata("design:type", Number)
], Course.prototype, "maxStudents", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, name: 'is_active' }),
    __metadata("design:type", Boolean)
], Course.prototype, "isActive", void 0);
exports.Course = Course = __decorate([
    (0, typeorm_1.Entity)('courses'),
    (0, typeorm_1.Unique)(['tenantId', 'code'])
], Course);
//# sourceMappingURL=course.entity.js.map