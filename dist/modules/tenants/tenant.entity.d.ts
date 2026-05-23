import { TenantType, TenantLevel } from '../../common/enums/tenant-type.enum';
export declare class Tenant {
    id: string;
    name: string;
    subdomain: string;
    logo: string | null;
    legalName: string | null;
    ruc: string | null;
    modularCode: string | null;
    type: TenantType | null;
    level: TenantLevel | null;
    address: string | null;
    district: string | null;
    province: string | null;
    department: string | null;
    phone: string | null;
    email: string | null;
    directorName: string | null;
    isActive: boolean;
    settings: Record<string, any> | null;
    createdAt: Date;
    updatedAt: Date;
}
