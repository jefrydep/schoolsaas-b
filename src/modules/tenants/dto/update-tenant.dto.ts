import {
  IsString,
  IsOptional,
  IsBoolean,
  IsObject,
  IsEnum,
  MaxLength,
  IsEmail,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TenantType, TenantLevel } from '../../../common/enums/tenant-type.enum';

export class UpdateTenantDto {
  @ApiPropertyOptional({ example: 'Colegio San Martín', description: 'Nombre de la institución' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({ example: 'san-martin', description: 'Subdominio único' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  subdomain?: string;

  @ApiPropertyOptional({ example: 'Colegio San Martín S.A.C.', description: 'Razón social' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  legalName?: string;

  @ApiPropertyOptional({ example: '20412345679', description: 'RUC (11 dígitos)' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  ruc?: string;

  @ApiPropertyOptional({ example: '1234567', description: 'Código modular MINEDU' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  modularCode?: string;

  @ApiPropertyOptional({
    example: TenantType.INSTITUCION,
    enum: TenantType,
    description: 'Tipo de institución',
  })
  @IsOptional()
  @IsEnum(TenantType)
  type?: TenantType;

  @ApiPropertyOptional({
    example: TenantLevel.SECUNDARIA,
    enum: TenantLevel,
    description: 'Nivel educativo',
  })
  @IsOptional()
  @IsEnum(TenantLevel)
  level?: TenantLevel;

  @ApiPropertyOptional({ example: 'Av. Javier Prado 1234', description: 'Dirección' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  address?: string;

  @ApiPropertyOptional({ example: 'La Molina', description: 'Distrito' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  district?: string;

  @ApiPropertyOptional({ example: 'Lima', description: 'Provincia' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  province?: string;

  @ApiPropertyOptional({ example: 'Lima', description: 'Departamento' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  department?: string;

  @ApiPropertyOptional({ example: '+5112345678', description: 'Teléfono' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @ApiPropertyOptional({ example: 'contacto@sanmartin.edu.pe', description: 'Email institucional' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'Juan Pérez Rodríguez', description: 'Nombre del director' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  directorName?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/logo.png',
    description: 'URL del logo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  logo?: string;

  @ApiPropertyOptional({ example: true, description: 'Si el tenant está activo' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: { theme: 'dark', timezone: 'America/Lima' },
    description: 'Configuración adicional',
  })
  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;
}