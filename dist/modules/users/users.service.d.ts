import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SuperAdmin } from '../auth/super-admin.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseService } from '../../common/base/base.service';
export declare class UsersService extends BaseService<User> {
    private readonly userRepository;
    private readonly superAdminRepository;
    constructor(userRepository: Repository<User>, superAdminRepository: Repository<SuperAdmin>);
    create(dto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    emailExistsInAnyTenant(email: string): Promise<boolean>;
    findByEmailWithPassword(email: string, tenantId?: string): Promise<User | null>;
    createWithTenant(dto: CreateUserDto): Promise<User>;
    updatePassword(id: string, newPassword: string): Promise<void>;
}
