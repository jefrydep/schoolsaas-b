import { AdminsService } from './admins.service';
import { CreateAdminDto, UpdateAdminDto, ResetAdminPasswordDto } from './dto/admin.dto';
export declare class AdminsController {
    private readonly adminsService;
    constructor(adminsService: AdminsService);
    create(dto: CreateAdminDto): Promise<import("../users/user.entity").User>;
    findAll(): Promise<import("../users/user.entity").User[]>;
    findByTenant(tenantId: string): Promise<import("../users/user.entity").User[]>;
    findOne(id: string): Promise<import("../users/user.entity").User>;
    update(id: string, dto: UpdateAdminDto): Promise<import("../users/user.entity").User>;
    remove(id: string): Promise<void>;
    resetPassword(id: string, dto: ResetAdminPasswordDto): Promise<void>;
}
