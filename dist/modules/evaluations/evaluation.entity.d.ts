import { BaseEntity } from '../../common/base/base.entity';
import { EvaluationType } from '../../common/enums/evaluation-type.enum';
export declare class Evaluation extends BaseEntity {
    courseId: string;
    name: string;
    description: string | null;
    type: EvaluationType;
    maxScore: number;
    weight: number;
    date: string;
    isActive: boolean;
}
