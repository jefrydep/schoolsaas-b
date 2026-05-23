import { BaseEntity } from '../../common/base/base.entity';
export declare class Teacher extends BaseEntity {
    firstName: string;
    lastName: string;
    email: string | null;
    teacherCode: string;
    specialization: string | null;
    hireDate: string;
    isActive: boolean;
}
