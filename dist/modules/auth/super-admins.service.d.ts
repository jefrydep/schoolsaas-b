import { Repository } from 'typeorm';
import { SuperAdmin } from './super-admin.entity';
import { User } from '../users/user.entity';
export declare class SuperAdminsService {
    private readonly superAdminRepository;
    private readonly userRepository;
    constructor(superAdminRepository: Repository<SuperAdmin>, userRepository: Repository<User>);
    findByEmail(email: string): Promise<SuperAdmin | null>;
    private emailExistsInUsers;
    private emailExists;
    findOne(id: string): Promise<SuperAdmin>;
    findByEmailWithPassword(email: string): Promise<SuperAdmin | null>;
    create(data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }): Promise<SuperAdmin>;
    seedIfNotExists(): Promise<void>;
    updatePassword(id: string, newPassword: string): Promise<void>;
    findAll(): Promise<SuperAdmin[]>;
    update(id: string, data: {
        email?: string;
        firstName?: string;
        lastName?: string;
        isActive?: boolean;
        password?: string;
    }): Promise<SuperAdmin>;
    remove(id: string): Promise<void>;
}
