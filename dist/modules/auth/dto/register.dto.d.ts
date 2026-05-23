import { Role } from '../../../common/enums/role.enum';
export declare class RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: Role;
}
