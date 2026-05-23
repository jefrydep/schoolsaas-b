import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant-with-admin.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@ApiTags('Tenants')
@ApiBearerAuth()
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Crear tenant con administrador',
    description: 'Crea un nuevo tenant y su administrador. Solo SuperAdmin.',
  })
  @ApiResponse({
    status: 201,
    description: 'Tenant y admin creados exitosamente',
    schema: {
      example: {
        tenant: {
          id: 'uuid-del-tenant',
          name: 'Universidad XYZ',
          subdomain: 'universidad-xyz',
          isActive: true,
        },
        admin: {
          id: 'uuid-del-admin',
          email: 'admin@universidad-xyz.com',
          firstName: 'Carlos',
          lastName: 'García',
          role: 'ADMIN',
          tenantId: 'uuid-del-tenant',
        },
      },
    },
  })
  @ApiResponse({ status: 409, description: 'Subdomain ya en uso' })
  create(@Body() dto: CreateTenantDto) {
    return this.tenantsService.create(dto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Listar todos los tenants' })
  findAll() {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Obtener tenant por ID' })
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Actualizar tenant' })
  update(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.tenantsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Eliminar tenant' })
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(id);
  }
}
