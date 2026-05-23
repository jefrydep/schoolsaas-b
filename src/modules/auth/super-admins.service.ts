import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SuperAdmin } from './super-admin.entity';
import { User } from '../users/user.entity';

@Injectable()
export class SuperAdminsService {
  constructor(
    @InjectRepository(SuperAdmin)
    private readonly superAdminRepository: Repository<SuperAdmin>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<SuperAdmin | null> {
    return this.superAdminRepository.findOne({ where: { email } });
  }

  private async emailExistsInUsers(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  private async emailExists(email: string): Promise<boolean> {
    const superAdminExists = await this.findByEmail(email);
    if (superAdminExists) return true;
    return this.emailExistsInUsers(email);
  }

  async findOne(id: string): Promise<SuperAdmin> {
    const superAdmin = await this.superAdminRepository.findOne({ where: { id } });
    if (!superAdmin) {
      throw new NotFoundException('SuperAdmin not found');
    }
    return superAdmin;
  }

  async findByEmailWithPassword(email: string): Promise<SuperAdmin | null> {
    return this.superAdminRepository.findOne({
      where: { email },
      select: [
        'id',
        'email',
        'passwordHash',
        'firstName',
        'lastName',
        'isActive',
      ],
    });
  }

  async create(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<SuperAdmin> {
    if (await this.emailExists(data.email)) {
      throw new ConflictException('Email already registered as SuperAdmin or User');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const superAdmin = this.superAdminRepository.create({
      email: data.email,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    return this.superAdminRepository.save(superAdmin);
  }

  async seedIfNotExists(): Promise<void> {
    const email = process.env.SUPER_ADMIN_EMAIL || 'superadmin@vibecoding.com';
    const password = process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin123';
    const firstName = process.env.SUPER_ADMIN_FIRST_NAME || 'Super';
    const lastName = process.env.SUPER_ADMIN_LAST_NAME || 'Admin';

    const existing = await this.findByEmail(email);
    if (!existing) {
      await this.create({ email, password, firstName, lastName });
    }
  }

  async updatePassword(id: string, newPassword: string): Promise<void> {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.superAdminRepository.update(id, { passwordHash });
  }

  async findAll(): Promise<SuperAdmin[]> {
    return this.superAdminRepository.find({
      select: ['id', 'email', 'firstName', 'lastName', 'isActive', 'createdAt', 'updatedAt'],
    });
  }

  async update(id: string, data: {
    email?: string;
    firstName?: string;
    lastName?: string;
    isActive?: boolean;
    password?: string;
  }): Promise<SuperAdmin> {
    const superAdmin = await this.findOne(id);

    if (data.email && data.email !== superAdmin.email) {
      if (await this.emailExists(data.email)) {
        throw new ConflictException('Email already registered as SuperAdmin or User');
      }
    }

    if (data.email) superAdmin.email = data.email;
    if (data.firstName) superAdmin.firstName = data.firstName;
    if (data.lastName) superAdmin.lastName = data.lastName;
    if (data.isActive !== undefined) superAdmin.isActive = data.isActive;
    if (data.password) {
      superAdmin.passwordHash = await bcrypt.hash(data.password, 10);
    }
    return this.superAdminRepository.save(superAdmin);
  }

  async remove(id: string): Promise<void> {
    const superAdmin = await this.findOne(id);
    await this.superAdminRepository.remove(superAdmin);
  }
}
