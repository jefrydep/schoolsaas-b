import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { EnrollStudentDto } from './dto/enroll-student.dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(dto: CreateCourseDto): Promise<import("./course.entity").Course>;
    findAll(): Promise<import("./course.entity").Course[]>;
    findOne(id: string): Promise<import("./course.entity").Course>;
    update(id: string, dto: UpdateCourseDto): Promise<import("./course.entity").Course>;
    remove(id: string): Promise<void>;
    enrollStudent(id: string, dto: EnrollStudentDto): Promise<import("./course-student.entity").CourseStudent>;
    getStudents(id: string): Promise<import("./course-student.entity").CourseStudent[]>;
    removeStudent(id: string, studentId: string): Promise<void>;
}
