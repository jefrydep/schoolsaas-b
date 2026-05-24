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
    seedData;
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
        this.seedData = (0, data_1.generateSeedData)();
        this.logger.log('Starting database seeding...');
        await this.seed();
        this.logger.log('Database seeding completed!');
    }
    async seed() {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.createTenants(queryRunner);
            await this.createUsers(queryRunner);
            await this.createTeachers(queryRunner);
            await this.createStudents(queryRunner);
            await this.createCourses(queryRunner);
            await this.createEvaluations(queryRunner);
            await this.createCourseStudents(queryRunner);
            await this.createGrades(queryRunner);
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
        for (const tenantData of this.seedData.tenants) {
            const tenant = this.tenantRepository.create(tenantData);
            const savedTenant = await queryRunner.manager.save(tenant);
            tenants.push(savedTenant);
        }
        this.logger.log(`Created ${tenants.length} tenants`);
        return tenants;
    }
    async createUsers(queryRunner) {
        const users = [];
        const tenants = await this.tenantRepository.find();
        for (const userData of this.seedData.users) {
            const tenant = tenants[userData.tenantIndex];
            if (!tenant)
                continue;
            const passwordHash = await bcrypt.hash(userData.password, 10);
            const user = this.userRepository.create({
                ...userData,
                passwordHash,
                tenantId: tenant.id,
            });
            const savedUser = await queryRunner.manager.save(user);
            users.push(savedUser);
        }
        this.logger.log(`Created ${users.length} users`);
        return users;
    }
    async createTeachers(queryRunner) {
        const teachers = [];
        const tenants = await this.tenantRepository.find();
        for (const teacherData of this.seedData.teachers) {
            const tenant = tenants[teacherData.tenantIndex];
            if (!tenant)
                continue;
            const teacher = this.teacherRepository.create({
                ...teacherData,
                tenantId: tenant.id,
            });
            const savedTeacher = await queryRunner.manager.save(teacher);
            teachers.push(savedTeacher);
        }
        this.logger.log(`Created ${teachers.length} teachers`);
        return teachers;
    }
    async createStudents(queryRunner) {
        const students = [];
        const tenants = await this.tenantRepository.find();
        for (const studentData of this.seedData.students) {
            const tenant = tenants[studentData.tenantIndex];
            if (!tenant)
                continue;
            const student = this.studentRepository.create({
                ...studentData,
                tenantId: tenant.id,
            });
            const savedStudent = await queryRunner.manager.save(student);
            students.push(savedStudent);
        }
        this.logger.log(`Created ${students.length} students`);
        return students;
    }
    async createCourses(queryRunner) {
        const courses = [];
        const tenants = await this.tenantRepository.find();
        const teachers = await this.teacherRepository.find();
        for (const courseData of this.seedData.courses) {
            const tenant = tenants[courseData.tenantIndex];
            if (!tenant)
                continue;
            const teacher = teachers[courseData.teacherIndex];
            if (!teacher)
                continue;
            const course = this.courseRepository.create({
                ...courseData,
                tenantId: tenant.id,
                teacherId: teacher.id,
            });
            const savedCourse = await queryRunner.manager.save(course);
            courses.push(savedCourse);
        }
        this.logger.log(`Created ${courses.length} courses`);
        return courses;
    }
    async createEvaluations(queryRunner) {
        const evaluations = [];
        const courses = await this.courseRepository.find();
        for (const evalData of this.seedData.evaluations) {
            const course = courses[evalData.courseIndex];
            if (!course)
                continue;
            const evaluation = this.evaluationRepository.create({
                ...evalData,
                courseId: course.id,
                tenantId: course.tenantId,
            });
            const savedEval = await queryRunner.manager.save(evaluation);
            evaluations.push(savedEval);
        }
        this.logger.log(`Created ${evaluations.length} evaluations`);
        return evaluations;
    }
    async createCourseStudents(queryRunner) {
        const courseStudents = [];
        const courses = await this.courseRepository.find();
        const students = await this.studentRepository.find();
        for (const csData of this.seedData.courseStudents) {
            const course = courses[csData.courseIndex];
            const student = students[csData.studentIndex];
            if (!course || !student)
                continue;
            const courseStudent = this.courseStudentRepository.create({
                ...csData,
                courseId: course.id,
                studentId: student.id,
                tenantId: course.tenantId,
            });
            const saved = await queryRunner.manager.save(courseStudent);
            courseStudents.push(saved);
        }
        this.logger.log(`Created ${courseStudents.length} enrollments`);
        return courseStudents;
    }
    async createGrades(queryRunner) {
        const grades = [];
        const students = await this.studentRepository.find();
        const evaluations = await this.evaluationRepository.find();
        for (const gradeData of this.seedData.grades) {
            const student = students[gradeData.studentIndex];
            const evaluation = evaluations[gradeData.evaluationIndex];
            if (!student || !evaluation)
                continue;
            const grade = this.gradeRepository.create({
                ...gradeData,
                studentId: student.id,
                evaluationId: evaluation.id,
                tenantId: student.tenantId,
            });
            const savedGrade = await queryRunner.manager.save(grade);
            grades.push(savedGrade);
        }
        this.logger.log(`Created ${grades.length} grades`);
        return grades;
    }
    logSummary() {
        this.logger.log('=== Seed Summary ===');
        this.logger.log(`Tenants: ${this.seedData.tenants.length}`);
        this.logger.log(`Users: ${this.seedData.users.length}`);
        this.logger.log(`Teachers: ${this.seedData.teachers.length}`);
        this.logger.log(`Students: ${this.seedData.students.length}`);
        this.logger.log(`Courses: ${this.seedData.courses.length}`);
        this.logger.log(`Evaluations: ${this.seedData.evaluations.length}`);
        this.logger.log(`Enrollments: ${this.seedData.courseStudents.length}`);
        this.logger.log(`Grades: ${this.seedData.grades.length}`);
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