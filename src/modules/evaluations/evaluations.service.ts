import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from './evaluation.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { BaseService } from '../../common/base/base.service';
import { getCurrentTenantId } from '../../common/utils/tenant-context';

@Injectable()
export class EvaluationsService extends BaseService<Evaluation> {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
  ) {
    super(evaluationRepository);
  }

  async findByCourse(courseId: string): Promise<Evaluation[]> {
    const tenantId = getCurrentTenantId();
    return this.evaluationRepository.find({
      where: { courseId, tenantId },
      order: { date: 'ASC' },
    });
  }
}
