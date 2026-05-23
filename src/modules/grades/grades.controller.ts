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
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR)
  create(@Body() dto: CreateGradeDto) {
    return this.gradesService.create(dto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR, Role.ESTUDIANTE)
  findAll() {
    return this.gradesService.findAll();
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR, Role.ESTUDIANTE)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.gradesService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateGradeDto) {
    return this.gradesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.gradesService.remove(id);
  }

  @Get('evaluation/:evaluationId')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR)
  findByEvaluation(@Param('evaluationId', ParseUUIDPipe) evaluationId: string) {
    return this.gradesService.findByEvaluation(evaluationId);
  }

  @Get('student/:studentId')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR, Role.ESTUDIANTE)
  findByStudent(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.gradesService.findByStudent(studentId);
  }

  @Get('average/:courseId/student/:studentId')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR, Role.ESTUDIANTE)
  getStudentCourseAverage(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Param('studentId', ParseUUIDPipe) studentId: string,
  ) {
    return this.gradesService.getStudentCourseAverage(studentId, courseId);
  }
}
