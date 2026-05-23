import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { BaseService } from '../../common/base/base.service';
export declare class TeachersService extends BaseService<Teacher> {
    private readonly teacherRepository;
    constructor(teacherRepository: Repository<Teacher>);
    create(dto: CreateTeacherDto): Promise<Teacher>;
}
