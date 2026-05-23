export declare class GlobalStatsDto {
    totalTenants: number;
    activeTenants: number;
    totalStudents: number;
    totalTeachers: number;
    totalCourses: number;
    totalEvaluations: number;
}
export declare class TenantStatsDto {
    tenantId: string;
    tenantName: string;
    studentCount: number;
    teacherCount: number;
    courseCount: number;
    evaluationCount: number;
}
export declare class DashboardStatsDto {
    global: GlobalStatsDto;
    byTenant: TenantStatsDto[];
}
