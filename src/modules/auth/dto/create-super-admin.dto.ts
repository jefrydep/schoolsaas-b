import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSuperAdminDto {
  @ApiProperty({
    example: 'superadmin@vibecoding.com',
    description: 'Correo electrónico del SuperAdmin',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'SuperAdmin123',
    description: 'Contraseña (mínimo 8 caracteres)',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;

  @ApiProperty({ example: 'Super', description: 'Nombre del SuperAdmin' })
  @IsString()
  @MaxLength(100)
  firstName!: string;

  @ApiProperty({ example: 'Admin', description: 'Apellido del SuperAdmin' })
  @IsString()
  @MaxLength(100)
  lastName!: string;
}