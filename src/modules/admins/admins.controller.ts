import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AdminsService } from './admins.service';
import { CreateAdminDto, UpdateAdminDto, ResetAdminPasswordDto } from './dto/admin.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@ApiTags('Admins')
@ApiBearerAuth()
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Crear administrador de tenant' })
  @ApiResponse({ status: 201, description: 'Admin creado exitosamente' })
  @ApiResponse({ status: 409, description: 'Email ya registrado' })
  create(@Body() dto: CreateAdminDto) {
    return this.adminsService.create(dto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Listar todos los administradores' })
  findAll() {
    return this.adminsService.findAll();
  }

  @Get('tenant/:tenantId')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Listar admins de un tenant' })
  findByTenant(@Param('tenantId') tenantId: string) {
    return this.adminsService.findByTenant(tenantId);
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Obtener admin por ID' })
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Actualizar administrador' })
  update(@Param('id') id: string, @Body() dto: UpdateAdminDto) {
    return this.adminsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Eliminar administrador' })
  remove(@Param('id') id: string) {
    return this.adminsService.remove(id);
  }

  @Post(':id/reset-password')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Restablecer contraseña de administrador' })
  resetPassword(@Param('id') id: string, @Body() dto: ResetAdminPasswordDto) {
    return this.adminsService.resetPassword(id, dto);
  }
}