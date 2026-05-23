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
var DatabaseSeeder_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const tenant_entity_1 = require("../../modules/tenants/tenant.entity");
const user_entity_1 = require("../../modules/users/user.entity");
const teacher_entity_1 = require("../../modules/teachers/teacher.entity");
const student_entity_1 = require("../../modules/students/student.entity");
const course_entity_1 = require("../../modules/courses/course.entity");
const evaluation_entity_1 = require("../../modules/evaluations/evaluation.entity");
const grade_entity_1 = require("../../modules/grades/grade.entity");
const course_student_entity_1 = require("../../modules/courses/course-student.entity");
const data_1 = require("./data");
let DatabaseSeeder = DatabaseSeeder_1 = class DatabaseSeeder {
    dataSource;
    tenantRepository;
    userRepository;
    teacherRepository;
    studentRepository;
    courseRepository;
    evaluationRepository;
    gradeRepository;
    courseStudentRepository;
    logger = new common_1.Logger(DatabaseSeeder_1.name);
    constructor(dataSource, tenantRepository, userRepository, teacherRepository, studentRepository, courseRepository, evaluationRepository, gradeRepository, courseStudentRepository) {
        this.dataSource = dataSource;
        this.tenantRepository = tenantRepository;
        this.userRepository = userRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.evaluationRepository = evaluationRepository;
        this.gradeRepository = gradeRepository;
        this.courseStudentRepository = courseStudentRepository;
    }
    async onModuleInit() {
        const shouldSeed = process.env.SEED_DATABASE === 'true';
        if (!shouldSeed) {
            this.logger.log('Database seeding is disabled. Set SEED_DATABASE=true to enable.');
            return;
        }
        const tenantCount = await this.tenantRepository.count();
        const forceSeed = process.env.SEED_DATABASE_FORCE === 'true';
        if (tenantCount > 0 && !forceSeed) {
            this.logger.log('Database already has data. Skipping seed. Set SEED_DATABASE_FORCE=true to force.');
            return;
        }
        this.logger.log('Starting database seeding...');
        await this.seed();
        this.logger.log('Database seeding completed!');
    }
    async seed() {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const tenants = await this.createTenants(queryRunner);
            const users = await this.createUsers(queryRunner, tenants);
            const teachers = await this.createTeachers(queryRunner, tenants);
            const students = await this.createStudents(queryRunner, tenants);
            const courses = await this.createCourses(queryRunner, tenants, teachers);
            const evaluations = await this.createEvaluations(queryRunner, courses);
            const courseStudents = await this.createCourseStudents(queryRunner, tenants, courses, students);
            await this.createGrades(queryRunner, tenants, evaluations, students);
            await queryRunner.commitTransaction();
            this.logSummary();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error('Seeding failed, rolled back.', error);
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async createTenants(queryRunner) {
        const tenants = [];
        for (const tenantData of data_1.seedData.tenants) {
            const tenant = this.tenantRepository.create(tenantData);
            const savedTenant = await queryRunner.manager.save(tenant);
            tenants.push(savedTenant);
            this.logger.debug(`Created tenant: ${savedTenant.name}`);
        }
        return tenants;
    }
    async createUsers(queryRunner, tenants) {
        const users = [];
        for (let i = 0; i < data_1.seedData.users.length; i++) {
            const userData = data_1.seedData.users[i];
            const tenant = tenants[i % tenants.length];
            const passwordHash = await bcrypt.hash(userData.password, 10);
            const user = this.userRepository.create({
                ...userData,
                passwordHash,
                tenantId: tenant.id,
            });
            const savedUser = await queryRunner.manager.save(user);
            users.push(savedUser);
            this.logger.debug(`Created user: ${savedUser.email}`);
        }
        return users;
    }
    async createTeachers(queryRunner, tenants) {
        const teachers = [];
        for (let i = 0; i < data_1.seedData.teachers.length; i++) {
            const teacherData = data_1.seedData.teachers[i];
            const tenant = tenants[i % tenants.length];
            const teacher = this.teacherRepository.create({
                ...teacherData,
                tenantId: tenant.id,
            });
            const savedTeacher = await queryRunner.manager.save(teacher);
            teachers.push(savedTeacher);
            this.logger.debug(`Created teacher: ${savedTeacher.firstName} ${savedTeacher.lastName}`);
        }
        return teachers;
    }
    async createStudents(queryRunner, tenants) {
        const students = [];
        for (let i = 0; i < data_1.seedData.students.length; i++) {
            const studentData = data_1.seedData.students[i];
            const tenant = tenants[i % tenants.length];
            const student = this.studentRepository.create({
                ...studentData,
                tenantId: tenant.id,
            });
            const savedStudent = await queryRunner.manager.save(student);
            students.push(savedStudent);
            this.logger.debug(`Created student: ${savedStudent.firstName} ${savedStudent.lastName}`);
        }
        return students;
    }
    async createCourses(queryRunner, tenants, teachers) {
        const courses = [];
        for (let i = 0; i < data_1.seedData.courses.length; i++) {
            const courseData = data_1.seedData.courses[i];
            const tenant = tenants[i % tenants.length];
            const teacher = teachers[i] || null;
            const course = this.courseRepository.create({
                ...courseData,
                tenantId: tenant.id,
                teacherId: teacher?.id || null,
            });
            const savedCourse = await queryRunner.manager.save(course);
            courses.push(savedCourse);
            this.logger.debug(`Created course: ${savedCourse.name}`);
        }
        return courses;
    }
    async createEvaluations(queryRunner, courses) {
        const evaluations = [];
        for (let i = 0; i < data_1.seedData.evaluations.length; i++) {
            const evalData = data_1.seedData.evaluations[i];
            const course = courses[i % courses.length];
            const evaluation = this.evaluationRepository.create({
                ...evalData,
                courseId: course.id,
                tenantId: course.tenantId,
            });
            const savedEval = await queryRunner.manager.save(evaluation);
            evaluations.push(savedEval);
            this.logger.debug(`Created evaluation: ${savedEval.name}`);
        }
        return evaluations;
    }
    async createCourseStudents(queryRunner, tenants, courses, students) {
        const courseStudents = [];
        for (let i = 0; i < data_1.seedData.courseStudents.length; i++) {
            const courseStudentData = data_1.seedData.courseStudents[i];
            const tenant = tenants[i % tenants.length];
            const course = courses[i % courses.length];
            const student = students[i % students.length];
            const courseStudent = this.courseStudentRepository.create({
                ...courseStudentData,
                courseId: course.id,
                studentId: student.id,
                tenantId: tenant.id,
            });
            const saved = await queryRunner.manager.save(courseStudent);
            courseStudents.push(saved);
            this.logger.debug(`Enrolled student ${student.firstName} in course ${course.name}`);
        }
        return courseStudents;
    }
    async createGrades(queryRunner, tenants, evaluations, students) {
        const grades = [];
        for (let i = 0; i < data_1.seedData.grades.length; i++) {
            const gradeData = data_1.seedData.grades[i];
            const tenant = tenants[i % tenants.length];
            const evaluation = evaluations[i % evaluations.length];
            const student = students[i % students.length];
            const grade = this.gradeRepository.create({
                ...gradeData,
                evaluationId: evaluation.id,
                studentId: student.id,
                tenantId: tenant.id,
            });
            const savedGrade = await queryRunner.manager.save(grade);
            grades.push(savedGrade);
            this.logger.debug(`Created grade: ${savedGrade.score} for student ${student.firstName}`);
        }
        return grades;
    }
    logSummary() {
        this.logger.log('=== Seed Summary ===');
        this.logger.log(`Tenants: ${data_1.seedData.tenants.length}`);
        this.logger.log(`Users: ${data_1.seedData.users.length}`);
        this.logger.log(`Teachers: ${data_1.seedData.teachers.length}`);
        this.logger.log(`Students: ${data_1.seedData.students.length}`);
        this.logger.log(`Courses: ${data_1.seedData.courses.length}`);
        this.logger.log(`Evaluations: ${data_1.seedData.evaluations.length}`);
        this.logger.log(`Enrollments: ${data_1.seedData.courseStudents.length}`);
        this.logger.log(`Grades: ${data_1.seedData.grades.length}`);
        this.logger.log('====================');
    }
};
exports.DatabaseSeeder = DatabaseSeeder;
exports.DatabaseSeeder = DatabaseSeeder = DatabaseSeeder_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(4, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(5, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(6, (0, typeorm_1.InjectRepository)(evaluation_entity_1.Evaluation)),
    __param(7, (0, typeorm_1.InjectRepository)(grade_entity_1.Grade)),
    __param(8, (0, typeorm_1.InjectRepository)(course_student_entity_1.CourseStudent)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DatabaseSeeder);
//# sourceMappingURL=database.seeder.js.map