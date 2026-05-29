import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseSeeder } from './seeds/database.seeder';
import { Tenant } from '../modules/tenants/tenant.entity';
import { User } from '../modules/users/user.entity';
import { Teacher } from '../modules/teachers/teacher.entity';
import { Student } from '../modules/students/student.entity';
import { Course } from '../modules/courses/course.entity';
import { Evaluation } from '../modules/evaluations/evaluation.entity';
import { Grade } from '../modules/grades/grade.entity';
import { CourseStudent } from '../modules/courses/course-student.entity';
import { SuperAdmin } from '../modules/auth/super-admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tenant,
      User,
      Teacher,
      Student,
      Course,
      Evaluation,
      Grade,
      CourseStudent,
      SuperAdmin,
    ]),
  ],
  providers: [DatabaseSeeder],
  exports: [DatabaseSeeder],
})
export class DatabaseModule {}