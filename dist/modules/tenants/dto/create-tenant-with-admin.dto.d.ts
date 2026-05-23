import { TenantType, TenantLevel } from '../../../common/enums/tenant-type.enum';
declare class AdminUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export declare class CreateTenantDto {
    name: string;
    subdomain: string;
    legalName?: string;
    ruc?: string;
    modularCode?: string;
    type?: TenantType;
    level?: TenantLevel;
    address?: string;
    district?: string;
    province?: string;
    department?: string;
    phone?: string;
    email?: string;
    directorName?: string;
    logo?: string;
    isActive?: boolean;
    settings?: Record<string, any>;
    admin: AdminUserDto;
}
export {};
