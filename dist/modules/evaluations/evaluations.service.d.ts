import { Repository } from 'typeorm';
import { Evaluation } from './evaluation.entity';
import { BaseService } from '../../common/base/base.service';
export declare class EvaluationsService extends BaseService<Evaluation> {
    private readonly evaluationRepository;
    constructor(evaluationRepository: Repository<Evaluation>);
    findByCourse(courseId: string): Promise<Evaluation[]>;
}
