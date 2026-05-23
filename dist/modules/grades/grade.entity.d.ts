import { BaseEntity } from '../../common/base/base.entity';
export declare class Grade extends BaseEntity {
    evaluationId: string;
    studentId: string;
    score: number;
    isAutomatic: boolean;
}
