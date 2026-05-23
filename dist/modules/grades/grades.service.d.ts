import { Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { BaseService } from '../../common/base/base.service';
import { EvaluationsService } from '../evaluations/evaluations.service';
export declare class GradesService extends BaseService<Grade> {
    private readonly gradeRepository;
    private readonly evaluationsService;
    constructor(gradeRepository: Repository<Grade>, evaluationsService: EvaluationsService);
    create(dto: CreateGradeDto): Promise<Grade>;
    findByEvaluation(evaluationId: string): Promise<Grade[]>;
    findByStudent(studentId: string): Promise<Grade[]>;
    getStudentCourseAverage(studentId: string, courseId: string): Promise<{
        average: number;
        totalGrades: number;
    }>;
}
