import { SuperAdminsService } from './super-admins.service';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
import { UpdateSuperAdminDto } from './dto/update-super-admin.dto';
export declare class SuperAdminsController {
    private readonly superAdminsService;
    constructor(superAdminsService: SuperAdminsService);
    create(dto: CreateSuperAdminDto): Promise<import("./super-admin.entity").SuperAdmin>;
    findAll(): Promise<import("./super-admin.entity").SuperAdmin[]>;
    checkEmail(email: string): Promise<{
        exists: boolean;
    }>;
    findOne(id: string): Promise<import("./super-admin.entity").SuperAdmin>;
    update(id: string, dto: UpdateSuperAdminDto): Promise<import("./super-admin.entity").SuperAdmin>;
    remove(id: string): Promise<void>;
}
