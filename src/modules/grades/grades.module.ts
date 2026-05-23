import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './grade.entity';
import { GradesController } from './grades.controller';
import { GradesService } from './grades.service';
import { EvaluationsModule } from '../evaluations/evaluations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Grade]), EvaluationsModule],
  controllers: [GradesController],
  providers: [GradesService],
  exports: [GradesService],
})
export class GradesModule {}
