import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
export declare class GradesController {
    private readonly gradesService;
    constructor(gradesService: GradesService);
    create(dto: CreateGradeDto): Promise<import("./grade.entity").Grade>;
    findAll(): Promise<import("./grade.entity").Grade[]>;
    findOne(id: string): Promise<import("./grade.entity").Grade>;
    update(id: string, dto: UpdateGradeDto): Promise<import("./grade.entity").Grade>;
    remove(id: string): Promise<void>;
    findByEvaluation(evaluationId: string): Promise<import("./grade.entity").Grade[]>;
    findByStudent(studentId: string): Promise<import("./grade.entity").Grade[]>;
    getStudentCourseAverage(courseId: string, studentId: string): Promise<{
        average: number;
        totalGrades: number;
    }>;
}
