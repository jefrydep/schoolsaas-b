import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { Tenant } from '../tenants/tenant.entity';
import { Student } from '../students/student.entity';
import { Teacher } from '../teachers/teacher.entity';
import { Course } from '../courses/course.entity';
import { Evaluation } from '../evaluations/evaluation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant, Student, Teacher, Course, Evaluation]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}