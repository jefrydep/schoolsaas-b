import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';
import { CreateTenantDto } from './dto/create-tenant-with-admin.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { User } from '../users/user.entity';
export declare class TenantsService {
    private readonly tenantRepository;
    private readonly userRepository;
    constructor(tenantRepository: Repository<Tenant>, userRepository: Repository<User>);
    create(dto: CreateTenantDto): Promise<{
        tenant: Tenant;
        admin: User;
    }>;
    findAll(): Promise<Tenant[]>;
    findOne(id: string): Promise<Tenant>;
    update(id: string, dto: UpdateTenantDto): Promise<Tenant>;
    remove(id: string): Promise<void>;
    findBySubdomain(subdomain: string): Promise<Tenant | null>;
}
