import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  MaxLength,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del estudiante', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  firstName!: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del estudiante', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  lastName!: string;

  @ApiPropertyOptional({ example: 'juan.perez@ejemplo.com', description: 'Correo electrónico' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'EST-2026-001', description: 'Código del estudiante', maxLength: 50 })
  @IsString()
  @MaxLength(50)
  studentCode!: string;

  @ApiPropertyOptional({ example: '2005-03-15', description: 'Fecha de nacimiento (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ example: 'Lima', description: 'Distrito de nacimiento' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  birthDistrict?: string;

  @ApiPropertyOptional({ example: 'Lima', description: 'Provincia de nacimiento' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  birthProvince?: string;

  @ApiPropertyOptional({ example: 'Lima', description: 'Departamento de nacimiento' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  birthDepartment?: string;

  @ApiPropertyOptional({ example: 'M', description: 'Sexo: M o F' })
  @IsOptional()
  @IsIn(['M', 'F'])
  sex?: string;

  @ApiPropertyOptional({ example: 'Peruana', description: 'Nacionalidad' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nationality?: string;

  @ApiPropertyOptional({ example: 'DNI', description: 'Tipo de documento: DNI, Pasaporte, CE' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  documentType?: string;

  @ApiPropertyOptional({ example: '12345678', description: 'Número de documento' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  documentNumber?: string;

  @ApiPropertyOptional({ example: '2026000123456', description: 'Código CUI (MINEDU)' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  cuiCode?: string;

  @ApiPropertyOptional({ example: 'Av. Arequipa 123, Lima', description: 'Dirección completa' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '987654321', description: 'Teléfono de contacto' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({ example: '3', description: 'Grado: 1-6 primaria, 1-5 secundaria' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  grade?: string;

  @ApiPropertyOptional({ example: 'A', description: 'Sección: A, B, C...' })
  @IsOptional()
  @IsString()
  @MaxLength(5)
  section?: string;

  @ApiPropertyOptional({ example: '2026', description: 'Año académico' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  academicYear?: string;

  @ApiPropertyOptional({ example: 'nuevo', description: 'Tipo de ingreso: nuevo, reingreso, traslado' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  admissionType?: string;

  @ApiPropertyOptional({ example: 'I.E. San Miguel', description: 'Escuela de procedencia' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  previousSchool?: string;

  @ApiProperty({ example: '2026-01-15', description: 'Fecha de inscripción (YYYY-MM-DD)' })
  @IsDateString()
  enrollmentDate!: string;

  @ApiPropertyOptional({ example: 'María Pérez', description: 'Nombre del apoderado' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  guardianName?: string;

  @ApiPropertyOptional({ example: '12345678', description: 'DNI del apoderado' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  guardianDocumentNumber?: string;

  @ApiPropertyOptional({ example: 'Madre', description: 'Parentesco: Padre, Madre, Apoderado, Otro' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  relationship?: string;

  @ApiPropertyOptional({ example: 'Ingeniera', description: 'Ocupación del apoderado' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  occupation?: string;

  @ApiPropertyOptional({ example: '987654321', description: 'Teléfono del apoderado' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  guardianPhone?: string;

  @ApiPropertyOptional({ example: 'maria.perez@ejemplo.com', description: 'Email del apoderado' })
  @IsOptional()
  @IsEmail()
  guardianEmail?: string;

  @ApiPropertyOptional({ example: 'O+', description: 'Tipo de sangre' })
  @IsOptional()
  @IsString()
  @MaxLength(5)
  bloodType?: string;

  @ApiPropertyOptional({ example: 'Polen, polvo', description: 'Alergias' })
  @IsOptional()
  @IsString()
  allergies?: string;

  @ApiPropertyOptional({ example: 'Asma', description: 'Enfermedades crónicas' })
  @IsOptional()
  @IsString()
  diseases?: string;

  @ApiPropertyOptional({ example: 'Ninguna', description: 'Discapacidad' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  disability?: string;

  @ApiPropertyOptional({ example: 'SIS', description: 'Seguro: SIS, EsSalud, Privado, Ninguno' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  insurance?: string;

  @ApiPropertyOptional({ example: 'B', description: 'Nivel socioeconómico: A, B, C, D, E' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  socioeconomicLevel?: string;
}