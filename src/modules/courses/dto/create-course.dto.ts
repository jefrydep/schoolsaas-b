import {
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCourseDto {
  @IsOptional()
  @IsUUID()
  teacherId?: string;

  @IsString()
  @MaxLength(200)
  name!: string;

  @IsString()
  @MaxLength(50)
  code!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @MaxLength(50)
  academicPeriod!: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  credits?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  maxStudents?: number;
}
