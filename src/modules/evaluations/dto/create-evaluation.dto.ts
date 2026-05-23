import {
  IsString,
  IsUUID,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import { EvaluationType } from '../../../common/enums/evaluation-type.enum';

export class CreateEvaluationDto {
  @IsUUID()
  courseId!: string;

  @IsString()
  @MaxLength(200)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(EvaluationType)
  type!: EvaluationType;

  @IsNumber()
  @Min(0)
  maxScore!: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  weight!: number;

  @IsDateString()
  date!: string;
}
