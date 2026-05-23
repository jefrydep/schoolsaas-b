import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Tenant } from './tenant.entity';
import { CreateTenantDto } from './dto/create-tenant-with-admin.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { User } from '../users/user.entity';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateTenantDto): Promise<{ tenant: Tenant; admin: User }> {
    const existing = await this.tenantRepository.findOne({
      where: { subdomain: dto.subdomain },
    });
    if (existing) {
      throw new ConflictException('Subdomain already in use');
    }

    const tenant = this.tenantRepository.create({
      name: dto.name,
      subdomain: dto.subdomain,
      legalName: dto.legalName,
      ruc: dto.ruc,
      modularCode: dto.modularCode,
      type: dto.type,
      level: dto.level,
      address: dto.address,
      district: dto.district,
      province: dto.province,
      department: dto.department,
      phone: dto.phone,
      email: dto.email,
      directorName: dto.directorName,
      logo: dto.logo,
      isActive: dto.isActive ?? true,
      settings: dto.settings,
    });
    const savedTenant = await this.tenantRepository.save(tenant);

    const passwordHash = await bcrypt.hash(dto.admin.password, 10);
    const admin = this.userRepository.create({
      email: dto.admin.email,
      passwordHash,
      firstName: dto.admin.firstName,
      lastName: dto.admin.lastName,
      role: Role.ADMIN,
      tenantId: savedTenant.id,
    });
    const savedAdmin = await this.userRepository.save(admin);

    return { tenant: savedTenant, admin: savedAdmin };
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  async update(id: string, dto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.findOne(id);
    Object.assign(tenant, dto);
    return this.tenantRepository.save(tenant);
  }

  async remove(id: string): Promise<void> {
    const tenant = await this.findOne(id);
    await this.tenantRepository.remove(tenant);
  }

  async findBySubdomain(subdomain: string): Promise<Tenant | null> {
    return this.tenantRepository.findOne({ where: { subdomain } });
  }
}
