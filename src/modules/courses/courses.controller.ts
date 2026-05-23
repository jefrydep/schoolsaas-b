import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { EnrollStudentDto } from './dto/enroll-student.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  create(@Body() dto: CreateCourseDto) {
    return this.coursesService.create(dto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR, Role.ESTUDIANTE)
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR, Role.ESTUDIANTE)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.coursesService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCourseDto) {
    return this.coursesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.coursesService.remove(id);
  }

  @Post(':id/enroll')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  enrollStudent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: EnrollStudentDto,
  ) {
    return this.coursesService.enrollStudent(id, dto);
  }

  @Get(':id/students')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR)
  getStudents(@Param('id', ParseUUIDPipe) id: string) {
    return this.coursesService.getEnrolledStudents(id);
  }

  @Delete(':id/students/:studentId')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  removeStudent(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('studentId', ParseUUIDPipe) studentId: string,
  ) {
    return this.coursesService.removeStudent(id, studentId);
  }
}
