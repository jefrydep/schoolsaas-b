import { StatsService } from './stats.service';
import { DashboardStatsDto } from './dto/stats.dto';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getDashboardStats(): Promise<DashboardStatsDto>;
}
