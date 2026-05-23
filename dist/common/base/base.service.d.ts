import { Repository, FindOptionsWhere, DeepPartial, FindManyOptions } from 'typeorm';
import { BaseEntity } from './base.entity';
export declare abstract class BaseService<T extends BaseEntity> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>);
    protected isSuperAdmin(): boolean;
    protected getTenantFilter(): FindOptionsWhere<T>;
    findAll(options?: FindManyOptions<T>): Promise<T[]>;
    findOne(id: string): Promise<T>;
    create(dto: DeepPartial<T>): Promise<T>;
    update(id: string, dto: DeepPartial<T>): Promise<T>;
    remove(id: string): Promise<void>;
    count(): Promise<number>;
}
