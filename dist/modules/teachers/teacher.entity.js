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
exports.Teacher = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/base/base.entity");
let Teacher = class Teacher extends base_entity_1.BaseEntity {
    firstName;
    lastName;
    email;
    teacherCode;
    specialization;
    hireDate;
    isActive;
};
exports.Teacher = Teacher;
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'first_name' }),
    __metadata("design:type", String)
], Teacher.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'last_name' }),
    __metadata("design:type", String)
], Teacher.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Teacher.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, name: 'teacher_code' }),
    __metadata("design:type", String)
], Teacher.prototype, "teacherCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", Object)
], Teacher.prototype, "specialization", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'hire_date' }),
    __metadata("design:type", String)
], Teacher.prototype, "hireDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, name: 'is_active' }),
    __metadata("design:type", Boolean)
], Teacher.prototype, "isActive", void 0);
exports.Teacher = Teacher = __decorate([
    (0, typeorm_1.Entity)('teachers'),
    (0, typeorm_1.Unique)(['tenantId', 'teacherCode'])
], Teacher);
//# sourceMappingURL=teacher.entity.js.map