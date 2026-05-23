import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { BaseService } from '../../common/base/base.service';
import { getCurrentTenantId } from '../../common/utils/tenant-context';

@Injectable()
export class TeachersService extends BaseService<Teacher> {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {
    super(teacherRepository);
  }

  async create(dto: CreateTeacherDto): Promise<Teacher> {
    const tenantId = getCurrentTenantId();

    const existing = await this.teacherRepository.findOne({
      where: { teacherCode: dto.teacherCode, tenantId },
    });
    if (existing) {
      throw new ConflictException('Teacher code already exists in this tenant');
    }

    return super.create(dto);
  }
}
