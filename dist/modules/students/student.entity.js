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
exports.Student = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/base/base.entity");
let Student = class Student extends base_entity_1.BaseEntity {
    firstName;
    lastName;
    email;
    studentCode;
    dateOfBirth;
    birthDistrict;
    birthProvince;
    birthDepartment;
    sex;
    nationality;
    documentType;
    documentNumber;
    cuiCode;
    address;
    phone;
    grade;
    section;
    academicYear;
    admissionType;
    previousSchool;
    enrollmentDate;
    guardianName;
    guardianDocumentNumber;
    relationship;
    occupation;
    guardianPhone;
    guardianEmail;
    bloodType;
    allergies;
    diseases;
    disability;
    insurance;
    socioeconomicLevel;
    isActive;
};
exports.Student = Student;
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'first_name' }),
    __metadata("design:type", String)
], Student.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'last_name' }),
    __metadata("design:type", String)
], Student.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Student.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'student_code' }),
    __metadata("design:type", String)
], Student.prototype, "studentCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, name: 'date_of_birth' }),
    __metadata("design:type", Object)
], Student.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true, name: 'birth_district' }),
    __metadata("design:type", Object)
], Student.prototype, "birthDistrict", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true, name: 'birth_province' }),
    __metadata("design:type", Object)
], Student.prototype, "birthProvince", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true, name: 'birth_department' }),
    __metadata("design:type", Object)
], Student.prototype, "birthDepartment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1, nullable: true }),
    __metadata("design:type", Object)
], Student.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], Student.prototype, "nationality", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true, name: 'document_type' }),
    __metadata("design:type", Object)
], Student.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true, name: 'document_number' }),
    __metadata("design:type", Object)
], Student.prototype, "documentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true, name: 'cui_code' }),
    __metadata("design:type", Object)
], Student.prototype, "cuiCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Student.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Student.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true, name: 'grade' }),
    __metadata("design:type", Object)
], Student.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 5, nullable: true }),
    __metadata("design:type", Object)
], Student.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true, name: 'academic_year' }),
    __metadata("design:type", Object)
], Student.prototype, "academicYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: true, name: 'admission_type' }),
    __metadata("design:type", Object)
], Student.prototype, "admissionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true, name: 'previous_school' }),
    __metadata("design:type", Object)
], Student.prototype, "previousSchool", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'enrollment_date' }),
    __metadata("design:type", String)
], Student.prototype, "enrollmentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true, name: 'guardian_name' }),
    __metadata("design:type", Object)
], Student.prototype, "guardianName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true, name: 'guardian_document_number' }),
    __metadata("design:type", Object)
], Student.prototype, "guardianDocumentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Student.prototype, "relationship", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Student.prototype, "occupation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true, name: 'guardian_phone' }),
    __metadata("design:type", Object)
], Student.prototype, "guardianPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true, name: 'guardian_email' }),
    __metadata("design:type", Object)
], Student.prototype, "guardianEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 5, nullable: true, name: 'blood_type' }),
    __metadata("design:type", Object)
], Student.prototype, "bloodType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Student.prototype, "allergies", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Student.prototype, "diseases", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Student.prototype, "disability", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Student.prototype, "insurance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true, name: 'socioeconomic_level' }),
    __metadata("design:type", Object)
], Student.prototype, "socioeconomicLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, name: 'is_active' }),
    __metadata("design:type", Boolean)
], Student.prototype, "isActive", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)('students'),
    (0, typeorm_1.Unique)(['tenantId', 'studentCode'])
], Student);
//# sourceMappingURL=student.entity.js.map