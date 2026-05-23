export declare class CreateAdminDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    tenantId?: string;
}
export declare class UpdateAdminDto {
    email?: string;
    firstName?: string;
    lastName?: string;
    isActive?: boolean;
}
export declare class ResetAdminPasswordDto {
    newPassword: string;
}
