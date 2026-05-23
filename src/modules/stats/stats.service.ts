import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import { Student } from '../students/student.entity';
import { Teacher } from '../teachers/teacher.entity';
import { Course } from '../courses/course.entity';
import { Evaluation } from '../evaluations/evaluation.entity';
import {
  GlobalStatsDto,
  TenantStatsDto,
  DashboardStatsDto,
} from './dto/stats.dto';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
  ) {}

  async getGlobalStats(): Promise<GlobalStatsDto> {
    const [totalTenants, activeTenants, totalStudents, totalTeachers, totalCourses, totalEvaluations] =
      await Promise.all([
        this.tenantRepository.count(),
        this.tenantRepository.count({ where: { isActive: true } }),
        this.studentRepository.count(),
        this.teacherRepository.count(),
        this.courseRepository.count(),
        this.evaluationRepository.count(),
      ]);

    return {
      totalTenants,
      activeTenants,
      totalStudents,
      totalTeachers,
      totalCourses,
      totalEvaluations,
    };
  }

  async getStatsByTenant(): Promise<TenantStatsDto[]> {
    const tenants = await this.tenantRepository.find();

    const stats: TenantStatsDto[] = [];

    for (const tenant of tenants) {
      const [studentCount, teacherCount, courseCount, evaluationCount] = await Promise.all([
        this.studentRepository.count({ where: { tenantId: tenant.id } }),
        this.teacherRepository.count({ where: { tenantId: tenant.id } }),
        this.courseRepository.count({ where: { tenantId: tenant.id } }),
        this.evaluationRepository.count({ where: { tenantId: tenant.id } }),
      ]);

      stats.push({
        tenantId: tenant.id,
        tenantName: tenant.name,
        studentCount,
        teacherCount,
        courseCount,
        evaluationCount,
      });
    }

    return stats;
  }

  async getDashboardStats(): Promise<DashboardStatsDto> {
    const [global, byTenant] = await Promise.all([
      this.getGlobalStats(),
      this.getStatsByTenant(),
    ]);

    return { global, byTenant };
  }
}