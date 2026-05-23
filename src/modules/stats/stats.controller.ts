import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { StatsService } from './stats.service';
import { DashboardStatsDto } from './dto/stats.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Stats')
@ApiBearerAuth()
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('dashboard')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Obtener estadísticas globales del dashboard' })
  getDashboardStats(): Promise<DashboardStatsDto> {
    return this.statsService.getDashboardStats();
  }
}