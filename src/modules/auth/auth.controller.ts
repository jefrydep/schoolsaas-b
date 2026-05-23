import { Controller, Post, Body, UseGuards, Request, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { IsString } from 'class-validator';

class VerifyPasswordDto {
  @IsString()
  password!: string;
}

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Autentica un usuario. Acepta tanto SuperAdmin como usuarios de tenant. Retorna token en cookie HttpOnly y en cuerpo de respuesta.',
  })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'uuid-del-usuario',
          email: 'usuario@ejemplo.com',
          firstName: 'Juan',
          lastName: 'Pérez',
          role: 'ADMIN',
          tenantId: 'uuid-del-tenant',
        },
      },
    },
    headers: {
      'Set-Cookie': {
        description: 'Cookie HttpOnly con el token de acceso',
        example: 'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Path=/; Max-Age=86400',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  login(@Body() dto: LoginDto, @Res() res: Response) {
    return this.authService.login(dto, res);
  }

  @Post('register')
  @Public()
  @ApiOperation({
    summary: 'Registrar usuario',
    description: 'Registra un nuevo usuario dentro del tenant por defecto. Retorna token en cookie HttpOnly y en cuerpo de respuesta.',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'uuid-del-usuario',
          email: 'usuario@ejemplo.com',
          firstName: 'Juan',
          lastName: 'Pérez',
          role: 'ADMIN',
          tenantId: 'uuid-del-tenant',
        },
      },
    },
    headers: {
      'Set-Cookie': {
        description: 'Cookie HttpOnly con el token de acceso',
        example: 'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Path=/; Max-Age=86400',
      },
    },
  })
  @ApiResponse({ status: 409, description: 'El email ya está registrado' })
  register(@Body() dto: RegisterDto, @Res() res: Response) {
    return this.authService.register(dto, res);
  }

  @Post('forgot-password')
  @Public()
  @ApiOperation({
    summary: 'Recuperar contraseña',
    description: 'Envía un email con el enlace para restablecer la contraseña.',
  })
  @ApiResponse({
    status: 200,
    description: 'Si el email existe, se envió el enlace de recuperación',
    schema: {
      example: {
        message: 'If the email exists, a reset link has been sent',
      },
    },
  })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  @Public()
  @ApiOperation({
    summary: 'Restablecer contraseña',
    description: 'Restablece la contraseña usando el token recibido por email.',
  })
  @ApiResponse({
    status: 200,
    description: 'Contraseña restablecida exitosamente',
    schema: {
      example: {
        message: 'Password reset successfully',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Token inválido o expirado' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('verify-password')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Verificar contraseña de SuperAdmin',
    description: 'Verifica que la contraseña proporcionada es correcta del SuperAdmin logueado.',
  })
  @ApiResponse({ status: 200, description: 'Contraseña válida' })
  @ApiResponse({ status: 401, description: 'Contraseña incorrecta' })
  async verifyPassword(@Request() req: any, @Body() dto: VerifyPasswordDto) {
    return this.authService.verifySuperAdminPassword(req.user.id, dto.password);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Cerrar sesión', description: 'Elimina la cookie de autenticación.' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada exitosamente' })
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.json({ message: 'Logged out successfully' });
  }
}