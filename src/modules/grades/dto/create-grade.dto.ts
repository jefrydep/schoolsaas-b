import {
  IsUUID,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';

export class CreateGradeDto {
  @IsUUID()
  evaluationId!: string;

  @IsUUID()
  studentId!: string;

  @IsNumber()
  @Min(0)
  score!: number;

  @IsOptional()
  @IsBoolean()
  isAutomatic?: boolean;
}
