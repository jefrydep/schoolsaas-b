import { Repository } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import { Student } from '../students/student.entity';
import { Teacher } from '../teachers/teacher.entity';
import { Course } from '../courses/course.entity';
import { Evaluation } from '../evaluations/evaluation.entity';
import { GlobalStatsDto, TenantStatsDto, DashboardStatsDto } from './dto/stats.dto';
export declare class StatsService {
    private readonly tenantRepository;
    private readonly studentRepository;
    private readonly teacherRepository;
    private readonly courseRepository;
    private readonly evaluationRepository;
    constructor(tenantRepository: Repository<Tenant>, studentRepository: Repository<Student>, teacherRepository: Repository<Teacher>, courseRepository: Repository<Course>, evaluationRepository: Repository<Evaluation>);
    getGlobalStats(): Promise<GlobalStatsDto>;
    getStatsByTenant(): Promise<TenantStatsDto[]>;
    getDashboardStats(): Promise<DashboardStatsDto>;
}
