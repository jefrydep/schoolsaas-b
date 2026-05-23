import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
export declare class EvaluationsController {
    private readonly evaluationsService;
    constructor(evaluationsService: EvaluationsService);
    create(dto: CreateEvaluationDto): Promise<import("./evaluation.entity").Evaluation>;
    findAll(): Promise<import("./evaluation.entity").Evaluation[]>;
    findOne(id: string): Promise<import("./evaluation.entity").Evaluation>;
    update(id: string, dto: UpdateEvaluationDto): Promise<import("./evaluation.entity").Evaluation>;
    remove(id: string): Promise<void>;
    findByCourse(courseId: string): Promise<import("./evaluation.entity").Evaluation[]>;
}
