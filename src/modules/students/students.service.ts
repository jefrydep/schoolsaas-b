import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { BaseService } from '../../common/base/base.service';
import { getCurrentTenantId } from '../../common/utils/tenant-context';

@Injectable()
export class StudentsService extends BaseService<Student> {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {
    super(studentRepository);
  }

  async create(dto: CreateStudentDto): Promise<Student> {
    const tenantId = getCurrentTenantId();

    const existing = await this.studentRepository.findOne({
      where: { studentCode: dto.studentCode, tenantId },
    });
    if (existing) {
      throw new ConflictException('Student code already exists in this tenant');
    }

    return super.create(dto);
  }
}
