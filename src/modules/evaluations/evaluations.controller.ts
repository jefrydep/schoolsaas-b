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
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR)
  create(@Body() dto: CreateEvaluationDto) {
    return this.evaluationsService.create(dto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR, Role.ESTUDIANTE)
  findAll() {
    return this.evaluationsService.findAll();
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR, Role.ESTUDIANTE)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.evaluationsService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEvaluationDto,
  ) {
    return this.evaluationsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.evaluationsService.remove(id);
  }

  @Get('course/:courseId')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.PROFESOR, Role.ESTUDIANTE)
  findByCourse(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.evaluationsService.findByCourse(courseId);
  }
}
