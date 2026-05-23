import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CourseStudent, EnrollmentStatus } from './course-student.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { EnrollStudentDto } from './dto/enroll-student.dto';
import { BaseService } from '../../common/base/base.service';
import { getCurrentTenantId } from '../../common/utils/tenant-context';
import { StudentsService } from '../students/students.service';

@Injectable()
export class CoursesService extends BaseService<Course> {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(CourseStudent)
    private readonly courseStudentRepository: Repository<CourseStudent>,
    private readonly studentsService: StudentsService,
  ) {
    super(courseRepository);
  }

  async create(dto: CreateCourseDto): Promise<Course> {
    const tenantId = getCurrentTenantId();

    const existing = await this.courseRepository.findOne({
      where: { code: dto.code, tenantId },
    });
    if (existing) {
      throw new ConflictException('Course code already exists in this tenant');
    }

    return super.create(dto);
  }

  async enrollStudent(
    courseId: string,
    dto: EnrollStudentDto,
  ): Promise<CourseStudent> {
    const tenantId = getCurrentTenantId();

    const course = await this.findOne(courseId);

    await this.studentsService.findOne(dto.studentId);

    const existingEnrollment = await this.courseStudentRepository.findOne({
      where: {
        courseId,
        studentId: dto.studentId,
        tenantId,
      },
    });
    if (existingEnrollment) {
      throw new ConflictException('Student is already enrolled in this course');
    }

    const enrolledCount = await this.courseStudentRepository.count({
      where: { courseId, tenantId, status: EnrollmentStatus.ENROLLED },
    });
    if (enrolledCount >= course.maxStudents) {
      throw new BadRequestException('Course has reached maximum capacity');
    }

    const enrollment = this.courseStudentRepository.create({
      courseId,
      studentId: dto.studentId,
      tenantId,
      status: EnrollmentStatus.ENROLLED,
    });

    return this.courseStudentRepository.save(enrollment);
  }

  async getEnrolledStudents(courseId: string): Promise<CourseStudent[]> {
    await this.findOne(courseId);
    const tenantId = getCurrentTenantId();

    return this.courseStudentRepository.find({
      where: { courseId, tenantId },
      relations: [],
    });
  }

  async removeStudent(courseId: string, studentId: string): Promise<void> {
    const tenantId = getCurrentTenantId();

    const enrollment = await this.courseStudentRepository.findOne({
      where: { courseId, studentId, tenantId },
    });
    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    await this.courseStudentRepository.remove(enrollment);
  }
}
