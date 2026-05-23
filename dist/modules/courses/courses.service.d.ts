import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CourseStudent } from './course-student.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { EnrollStudentDto } from './dto/enroll-student.dto';
import { BaseService } from '../../common/base/base.service';
import { StudentsService } from '../students/students.service';
export declare class CoursesService extends BaseService<Course> {
    private readonly courseRepository;
    private readonly courseStudentRepository;
    private readonly studentsService;
    constructor(courseRepository: Repository<Course>, courseStudentRepository: Repository<CourseStudent>, studentsService: StudentsService);
    create(dto: CreateCourseDto): Promise<Course>;
    enrollStudent(courseId: string, dto: EnrollStudentDto): Promise<CourseStudent>;
    getEnrolledStudents(courseId: string): Promise<CourseStudent[]>;
    removeStudent(courseId: string, studentId: string): Promise<void>;
}
