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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./course.entity");
const course_student_entity_1 = require("./course-student.entity");
const base_service_1 = require("../../common/base/base.service");
const tenant_context_1 = require("../../common/utils/tenant-context");
const students_service_1 = require("../students/students.service");
let CoursesService = class CoursesService extends base_service_1.BaseService {
    courseRepository;
    courseStudentRepository;
    studentsService;
    constructor(courseRepository, courseStudentRepository, studentsService) {
        super(courseRepository);
        this.courseRepository = courseRepository;
        this.courseStudentRepository = courseStudentRepository;
        this.studentsService = studentsService;
    }
    async create(dto) {
        const tenantId = (0, tenant_context_1.getCurrentTenantId)();
        const existing = await this.courseRepository.findOne({
            where: { code: dto.code, tenantId },
        });
        if (existing) {
            throw new common_1.ConflictException('Course code already exists in this tenant');
        }
        return super.create(dto);
    }
    async enrollStudent(courseId, dto) {
        const tenantId = (0, tenant_context_1.getCurrentTenantId)();
        const course = await this.findOne(courseId);
        await this.studentsService.findOne(dto.studentId);
        const existingEnrollment = await this.courseStudentRepository.findOne({
            where: {
                courseId,
                studentId: dto.studentId,
                tenantId,
            },
        });
        if (existingEnrollment) {
            throw new common_1.ConflictException('Student is already enrolled in this course');
        }
        const enrolledCount = await this.courseStudentRepository.count({
            where: { courseId, tenantId, status: course_student_entity_1.EnrollmentStatus.ENROLLED },
        });
        if (enrolledCount >= course.maxStudents) {
            throw new common_1.BadRequestException('Course has reached maximum capacity');
        }
        const enrollment = this.courseStudentRepository.create({
            courseId,
            studentId: dto.studentId,
            tenantId,
            status: course_student_entity_1.EnrollmentStatus.ENROLLED,
        });
        return this.courseStudentRepository.save(enrollment);
    }
    async getEnrolledStudents(courseId) {
        await this.findOne(courseId);
        const tenantId = (0, tenant_context_1.getCurrentTenantId)();
        return this.courseStudentRepository.find({
            where: { courseId, tenantId },
            relations: [],
        });
    }
    async removeStudent(courseId, studentId) {
        const tenantId = (0, tenant_context_1.getCurrentTenantId)();
        const enrollment = await this.courseStudentRepository.findOne({
            where: { courseId, studentId, tenantId },
        });
        if (!enrollment) {
            throw new common_1.NotFoundException('Enrollment not found');
        }
        await this.courseStudentRepository.remove(enrollment);
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(1, (0, typeorm_1.InjectRepository)(course_student_entity_1.CourseStudent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        students_service_1.StudentsService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map