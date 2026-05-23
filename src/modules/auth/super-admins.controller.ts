import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SuperAdminsService } from './super-admins.service';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
import { UpdateSuperAdminDto } from './dto/update-super-admin.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('SuperAdmins')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles(Role.SUPER_ADMIN)
@Controller('superadmins')
export class SuperAdminsController {
  constructor(private readonly superAdminsService: SuperAdminsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear SuperAdmin' })
  create(@Body() dto: CreateSuperAdminDto) {
    return this.superAdminsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los SuperAdmins' })
  findAll() {
    return this.superAdminsService.findAll();
  }

  @Get('check-email/:email')
  @Public()
  @ApiOperation({ summary: 'Verificar si email existe como SuperAdmin' })
  async checkEmail(@Param('email') email: string) {
    const superAdmin = await this.superAdminsService.findByEmail(email);
    return { exists: !!superAdmin };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener SuperAdmin por ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.superAdminsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar SuperAdmin' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateSuperAdminDto,
  ) {
    return this.superAdminsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar SuperAdmin' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.superAdminsService.remove(id);
  }
}