import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    create(dto: CreateTeacherDto): Promise<import("./teacher.entity").Teacher>;
    findAll(): Promise<import("./teacher.entity").Teacher[]>;
    findOne(id: string): Promise<import("./teacher.entity").Teacher>;
    update(id: string, dto: UpdateTeacherDto): Promise<import("./teacher.entity").Teacher>;
    remove(id: string): Promise<void>;
}
