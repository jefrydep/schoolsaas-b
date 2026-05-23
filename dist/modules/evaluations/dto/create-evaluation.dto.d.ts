import { EvaluationType } from '../../../common/enums/evaluation-type.enum';
export declare class CreateEvaluationDto {
    courseId: string;
    name: string;
    description?: string;
    type: EvaluationType;
    maxScore: number;
    weight: number;
    date: string;
}
