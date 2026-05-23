import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { BaseService } from '../../common/base/base.service';
import { getCurrentTenantId } from '../../common/utils/tenant-context';
import { calculateWeightedAverage } from './utils/average-calculator';
import { EvaluationsService } from '../evaluations/evaluations.service';

@Injectable()
export class GradesService extends BaseService<Grade> {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    private readonly evaluationsService: EvaluationsService,
  ) {
    super(gradeRepository);
  }

  async create(dto: CreateGradeDto): Promise<Grade> {
    await this.evaluationsService.findOne(dto.evaluationId);

    return super.create(dto);
  }

  async findByEvaluation(evaluationId: string): Promise<Grade[]> {
    const tenantId = getCurrentTenantId();
    return this.gradeRepository.find({
      where: { evaluationId, tenantId },
    });
  }

  async findByStudent(studentId: string): Promise<Grade[]> {
    const tenantId = getCurrentTenantId();
    return this.gradeRepository.find({
      where: { studentId, tenantId },
    });
  }

  async getStudentCourseAverage(
    studentId: string,
    courseId: string,
  ): Promise<{ average: number; totalGrades: number }> {
    const tenantId = getCurrentTenantId();

    const evaluations = await this.evaluationsService.findByCourse(courseId);

    if (evaluations.length === 0) {
      return { average: 0, totalGrades: 0 };
    }

    const evaluationIds = evaluations.map((e) => e.id);

    const grades = await this.gradeRepository.find({
      where: {
        studentId,
        tenantId,
      },
    });

    const filteredGrades = grades.filter((g) =>
      evaluationIds.includes(g.evaluationId),
    );

    if (filteredGrades.length === 0) {
      return { average: 0, totalGrades: 0 };
    }

    const gradeData = filteredGrades.map((g) => {
      const evaluation = evaluations.find((e) => e.id === g.evaluationId);
      return {
        score: Number(g.score),
        weight: evaluation ? Number(evaluation.weight) : 0,
      };
    });

    const average = calculateWeightedAverage(gradeData);

    return { average, totalGrades: filteredGrades.length };
  }
}
