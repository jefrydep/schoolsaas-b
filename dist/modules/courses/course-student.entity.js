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
exports.CourseStudent = exports.EnrollmentStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/base/base.entity");
var EnrollmentStatus;
(function (EnrollmentStatus) {
    EnrollmentStatus["ENROLLED"] = "ENROLLED";
    EnrollmentStatus["DROPPED"] = "DROPPED";
    EnrollmentStatus["COMPLETED"] = "COMPLETED";
})(EnrollmentStatus || (exports.EnrollmentStatus = EnrollmentStatus = {}));
let CourseStudent = class CourseStudent extends base_entity_1.BaseEntity {
    courseId;
    studentId;
    status;
    enrolledAt;
};
exports.CourseStudent = CourseStudent;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'course_id' }),
    __metadata("design:type", String)
], CourseStudent.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'student_id' }),
    __metadata("design:type", String)
], CourseStudent.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EnrollmentStatus,
        default: EnrollmentStatus.ENROLLED,
    }),
    __metadata("design:type", String)
], CourseStudent.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'NOW()', name: 'enrolled_at' }),
    __metadata("design:type", Date)
], CourseStudent.prototype, "enrolledAt", void 0);
exports.CourseStudent = CourseStudent = __decorate([
    (0, typeorm_1.Entity)('course_students'),
    (0, typeorm_1.Unique)(['tenantId', 'courseId', 'studentId'])
], CourseStudent);
//# sourceMappingURL=course-student.entity.js.map