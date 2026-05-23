import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { BaseService } from '../../common/base/base.service';
export declare class StudentsService extends BaseService<Student> {
    private readonly studentRepository;
    constructor(studentRepository: Repository<Student>);
    create(dto: CreateStudentDto): Promise<Student>;
}
