import { BaseEntity } from '../../common/base/base.entity';
import { Role } from '../../common/enums/role.enum';
export declare class User extends BaseEntity {
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: Role;
    isActive: boolean;
}
