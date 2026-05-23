import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(dto: CreateStudentDto): Promise<import("./student.entity").Student>;
    findAll(): Promise<import("./student.entity").Student[]>;
    findOne(id: string): Promise<import("./student.entity").Student>;
    update(id: string, dto: UpdateStudentDto): Promise<import("./student.entity").Student>;
    remove(id: string): Promise<void>;
}
