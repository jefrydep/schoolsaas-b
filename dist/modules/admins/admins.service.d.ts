import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateAdminDto, UpdateAdminDto, ResetAdminPasswordDto } from './dto/admin.dto';
export declare class AdminsService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(dto: CreateAdminDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, dto: UpdateAdminDto): Promise<User>;
    remove(id: string): Promise<void>;
    resetPassword(id: string, dto: ResetAdminPasswordDto): Promise<void>;
    findByTenant(tenantId: string): Promise<User[]>;
}
