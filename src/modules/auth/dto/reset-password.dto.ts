import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'abc123def456...',
    description: 'Token de recuperación',
  })
  @IsString()
  token!: string;

  @ApiProperty({
    example: 'NuevaPassword123',
    description: 'Nueva contraseña (mínimo 8 caracteres)',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  newPassword!: string;
}