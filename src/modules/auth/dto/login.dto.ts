import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin@ejemplo.com',
    description: 'Correo electrónico. SuperAdmin: superadmin@vibecoding.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña. SuperAdmin: SuperAdmin123',
  })
  @IsString()
  password!: string;
}
