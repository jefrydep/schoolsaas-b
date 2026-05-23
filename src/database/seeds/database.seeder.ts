import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Tenant } from '../../modules/tenants/tenant.entity';
import { User } from '../../modules/users/user.entity';
import { Teacher } from '../../modules/teachers/teacher.entity';
import { Student } from '../../modules/students/student.entity';
import { Course } from '../../modules/courses/course.entity';
import { Evaluation } from '../../modules/evaluations/evaluation.entity';
import { Grade } from '../../modules/grades/grade.entity';
import { CourseStudent } from '../../modules/courses/course-student.entity';
import { seedData } from './data';

@Injectable()
export class DatabaseSeeder implements OnModuleInit {
  private readonly logger = new Logger(DatabaseSeeder.name);

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    @InjectRepository(CourseStudent)
    private readonly courseStudentRepository: Repository<CourseStudent>,
  ) {}

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
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Seeding failed, rolled back.', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async createTenants(queryRunner: any): Promise<Tenant[]> {
    const tenants: Tenant[] = [];
    for (const tenantData of seedData.tenants) {
      const tenant = this.tenantRepository.create(tenantData);
      const savedTenant = await queryRunner.manager.save(tenant);
      tenants.push(savedTenant);
      this.logger.debug(`Created tenant: ${savedTenant.name}`);
    }
    return tenants;
  }

  private async createUsers(queryRunner: any, tenants: Tenant[]): Promise<User[]> {
    const users: User[] = [];
    for (let i = 0; i < seedData.users.length; i++) {
      const userData = seedData.users[i];
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

  private async createTeachers(queryRunner: any, tenants: Tenant[]): Promise<Teacher[]> {
    const teachers: Teacher[] = [];
    for (let i = 0; i < seedData.teachers.length; i++) {
      const teacherData = seedData.teachers[i];
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

  private async createStudents(queryRunner: any, tenants: Tenant[]): Promise<Student[]> {
    const students: Student[] = [];
    for (let i = 0; i < seedData.students.length; i++) {
      const studentData = seedData.students[i];
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

  private async createCourses(
    queryRunner: any,
    tenants: Tenant[],
    teachers: Teacher[]
  ): Promise<Course[]> {
    const courses: Course[] = [];
    for (let i = 0; i < seedData.courses.length; i++) {
      const courseData = seedData.courses[i];
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

  private async createEvaluations(
    queryRunner: any,
    courses: Course[]
  ): Promise<Evaluation[]> {
    const evaluations: Evaluation[] = [];
    for (let i = 0; i < seedData.evaluations.length; i++) {
      const evalData = seedData.evaluations[i];
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

  private async createCourseStudents(
    queryRunner: any,
    tenants: Tenant[],
    courses: Course[],
    students: Student[]
  ): Promise<CourseStudent[]> {
    const courseStudents: CourseStudent[] = [];
    for (let i = 0; i < seedData.courseStudents.length; i++) {
      const courseStudentData = seedData.courseStudents[i];
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

  private async createGrades(
    queryRunner: any,
    tenants: Tenant[],
    evaluations: Evaluation[],
    students: Student[]
  ): Promise<Grade[]> {
    const grades: Grade[] = [];
    for (let i = 0; i < seedData.grades.length; i++) {
      const gradeData = seedData.grades[i];
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

  private logSummary() {
    this.logger.log('=== Seed Summary ===');
    this.logger.log(`Tenants: ${seedData.tenants.length}`);
    this.logger.log(`Users: ${seedData.users.length}`);
    this.logger.log(`Teachers: ${seedData.teachers.length}`);
    this.logger.log(`Students: ${seedData.students.length}`);
    this.logger.log(`Courses: ${seedData.courses.length}`);
    this.logger.log(`Evaluations: ${seedData.evaluations.length}`);
    this.logger.log(`Enrollments: ${seedData.courseStudents.length}`);
    this.logger.log(`Grades: ${seedData.grades.length}`);
    this.logger.log('====================');
  }
}