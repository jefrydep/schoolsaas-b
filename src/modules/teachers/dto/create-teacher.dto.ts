import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @MaxLength(100)
  firstName!: string;

  @IsString()
  @MaxLength(100)
  lastName!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @MaxLength(50)
  teacherCode!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  specialization?: string;

  @IsDateString()
  hireDate!: string;
}
