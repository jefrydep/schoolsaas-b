import {
  Repository,
  FindOptionsWhere,
  DeepPartial,
  FindManyOptions,
} from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getCurrentTenantId, getCurrentRole } from '../utils/tenant-context';
import { BaseEntity } from './base.entity';
import { Role } from '../enums/role.enum';

export abstract class BaseService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  protected isSuperAdmin(): boolean {
    return getCurrentRole() === Role.SUPER_ADMIN;
  }

  protected getTenantFilter(): FindOptionsWhere<T> {
    if (this.isSuperAdmin()) return {};
    const tenantId = getCurrentTenantId();
    if (!tenantId) return {};
    return { tenantId } as FindOptionsWhere<T>;
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    const where = {
      ...this.getTenantFilter(),
      ...(options?.where || {}),
    } as FindOptionsWhere<T>;
    return this.repository.find({ ...options, where });
  }

  async findOne(id: string): Promise<T> {
    const where = {
      ...this.getTenantFilter(),
      id,
    } as FindOptionsWhere<T>;
    const entity = await this.repository.findOne({ where });
    if (!entity) throw new NotFoundException('Entity not found');
    return entity;
  }

  async create(dto: DeepPartial<T>): Promise<T> {
    const tenantId = getCurrentTenantId();
    const entity = this.repository.create({
      ...dto,
      tenantId,
    } as DeepPartial<T>);
    return this.repository.save(entity);
  }

  async update(id: string, dto: DeepPartial<T>): Promise<T> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }

  async count(): Promise<number> {
    return this.repository.count({ where: this.getTenantFilter() });
  }
}
