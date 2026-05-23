import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant-with-admin.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
export declare class TenantsController {
    private readonly tenantsService;
    constructor(tenantsService: TenantsService);
    create(dto: CreateTenantDto): Promise<{
        tenant: import("./tenant.entity").Tenant;
        admin: import("../users/user.entity").User;
    }>;
    findAll(): Promise<import("./tenant.entity").Tenant[]>;
    findOne(id: string): Promise<import("./tenant.entity").Tenant>;
    update(id: string, dto: UpdateTenantDto): Promise<import("./tenant.entity").Tenant>;
    remove(id: string): Promise<void>;
}
