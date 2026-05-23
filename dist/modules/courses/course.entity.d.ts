import { BaseEntity } from '../../common/base/base.entity';
export declare class Course extends BaseEntity {
    teacherId: string | null;
    name: string;
    code: string;
    description: string | null;
    academicPeriod: string;
    credits: number;
    maxStudents: number;
    isActive: boolean;
}
