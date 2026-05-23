import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../common/enums/role.enum';

export class RegisterDto {
  @ApiProperty({
    example: 'admin@ejemplo.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña (mínimo 8 caracteres)',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  firstName!: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Apellido del usuario',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  lastName!: string;

  @ApiPropertyOptional({
    enum: Role,
    example: 'ADMIN',
    description: 'Rol del usuario (opcional)',
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
