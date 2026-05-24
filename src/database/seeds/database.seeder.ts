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
import { generateSeedData } from './data';

@Injectable()
export class DatabaseSeeder implements OnModuleInit {
  private readonly logger = new Logger(DatabaseSeeder.name);
  private seedData!: ReturnType<typeof generateSeedData>;

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

    this.seedData = generateSeedData();
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
    for (const tenantData of this.seedData.tenants) {
      const tenant = this.tenantRepository.create(tenantData);
      const savedTenant = await queryRunner.manager.save(tenant);
      tenants.push(savedTenant);
    }
    this.logger.log(`Created ${tenants.length} tenants`);
    return tenants;
  }

  private async createUsers(queryRunner: any): Promise<User[]> {
    const users: User[] = [];
    const tenants = await this.tenantRepository.find();

    for (const userData of this.seedData.users) {
      const tenant = tenants[userData.tenantIndex];
      if (!tenant) continue;

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

  private async createTeachers(queryRunner: any): Promise<Teacher[]> {
    const teachers: Teacher[] = [];
    const tenants = await this.tenantRepository.find();

    for (const teacherData of this.seedData.teachers) {
      const tenant = tenants[teacherData.tenantIndex];
      if (!tenant) continue;

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

  private async createStudents(queryRunner: any): Promise<Student[]> {
    const students: Student[] = [];
    const tenants = await this.tenantRepository.find();

    for (const studentData of this.seedData.students) {
      const tenant = tenants[studentData.tenantIndex];
      if (!tenant) continue;

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

  private async createCourses(queryRunner: any): Promise<Course[]> {
    const courses: Course[] = [];
    const tenants = await this.tenantRepository.find();
    const teachers = await this.teacherRepository.find();

    for (const courseData of this.seedData.courses) {
      const tenant = tenants[courseData.tenantIndex];
      if (!tenant) continue;

      const teacher = teachers[courseData.teacherIndex];
      if (!teacher) continue;

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

  private async createEvaluations(queryRunner: any): Promise<Evaluation[]> {
    const evaluations: Evaluation[] = [];
    const courses = await this.courseRepository.find();

    for (const evalData of this.seedData.evaluations) {
      const course = courses[evalData.courseIndex];
      if (!course) continue;

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

  private async createCourseStudents(queryRunner: any): Promise<CourseStudent[]> {
    const courseStudents: CourseStudent[] = [];
    const courses = await this.courseRepository.find();
    const students = await this.studentRepository.find();

    for (const csData of this.seedData.courseStudents) {
      const course = courses[csData.courseIndex];
      const student = students[csData.studentIndex];
      if (!course || !student) continue;

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

  private async createGrades(queryRunner: any): Promise<Grade[]> {
    const grades: Grade[] = [];
    const students = await this.studentRepository.find();
    const evaluations = await this.evaluationRepository.find();

    for (const gradeData of this.seedData.grades) {
      const student = students[gradeData.studentIndex];
      const evaluation = evaluations[gradeData.evaluationIndex];
      if (!student || !evaluation) continue;

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

  private logSummary() {
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
}