import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { Role } from '../../common/enums/role.enum';
import { CreateAdminDto, UpdateAdminDto, ResetAdminPasswordDto } from './dto/admin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateAdminDto): Promise<User> {
    if (!dto.tenantId) {
      throw new ForbiddenException('tenantId is required to create an admin');
    }

    const existing = await this.userRepository.findOne({
      where: { email: dto.email, tenantId: dto.tenantId },
    });
    if (existing) {
      throw new ConflictException('Email already registered in this tenant');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const admin = this.userRepository.create({
      email: dto.email,
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: Role.ADMIN,
      tenantId: dto.tenantId,
    });

    return this.userRepository.save(admin);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: Role.ADMIN },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<User> {
    const admin = await this.userRepository.findOne({
      where: { id, role: Role.ADMIN },
    });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  async update(id: string, dto: UpdateAdminDto): Promise<User> {
    const admin = await this.findOne(id);

    if (dto.email && dto.email !== admin.email) {
      const existing = await this.userRepository.findOne({
        where: { email: dto.email, tenantId: admin.tenantId },
      });
      if (existing) {
        throw new ConflictException('Email already registered in this tenant');
      }
    }

    Object.assign(admin, dto);
    return this.userRepository.save(admin);
  }

  async remove(id: string): Promise<void> {
    const admin = await this.findOne(id);
    await this.userRepository.remove(admin);
  }

  async resetPassword(id: string, dto: ResetAdminPasswordDto): Promise<void> {
    const admin = await this.findOne(id);
    const passwordHash = await bcrypt.hash(dto.newPassword, 10);
    await this.userRepository.update(id, { passwordHash });
  }

  async findByTenant(tenantId: string): Promise<User[]> {
    return this.userRepository.find({
      where: { tenantId, role: Role.ADMIN },
      order: { createdAt: 'DESC' },
    });
  }
}