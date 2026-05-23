import { ApiProperty } from '@nestjs/swagger';

export class GlobalStatsDto {
  @ApiProperty()
  totalTenants!: number;

  @ApiProperty()
  activeTenants!: number;

  @ApiProperty()
  totalStudents!: number;

  @ApiProperty()
  totalTeachers!: number;

  @ApiProperty()
  totalCourses!: number;

  @ApiProperty()
  totalEvaluations!: number;
}

export class TenantStatsDto {
  @ApiProperty()
  tenantId!: string;

  @ApiProperty()
  tenantName!: string;

  @ApiProperty()
  studentCount!: number;

  @ApiProperty()
  teacherCount!: number;

  @ApiProperty()
  courseCount!: number;

  @ApiProperty()
  evaluationCount!: number;
}

export class DashboardStatsDto {
  @ApiProperty({ type: GlobalStatsDto })
  global!: GlobalStatsDto;

  @ApiProperty({ type: [TenantStatsDto] })
  byTenant!: TenantStatsDto[];
}