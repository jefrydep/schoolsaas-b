import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SuperAdmin } from '../../modules/auth/super-admin.entity';

@Injectable()
export class DatabaseSeeder implements OnModuleInit {
  private readonly logger = new Logger(DatabaseSeeder.name);

  constructor(
    @InjectRepository(SuperAdmin)
    private readonly superAdminRepository: Repository<SuperAdmin>,
  ) {}

  async onModuleInit() {
    if (process.env.SEED_DATABASE !== 'true') {
      this.logger.log('Seeding disabled.');
      return;
    }

    const exists = await this.superAdminRepository.find();
    if (exists.length > 0) {
      this.logger.log('SuperAdmin already exists, skipping seed.');
      return;
    }

    const password = await bcrypt.hash('Iamthebestdeveloper1994@', 10);
    const admin = this.superAdminRepository.create({
      email: 'jefrydep@gmail.com',
      passwordHash: password,
      firstName: 'Super',
      lastName: 'Admin',
    });
    await this.superAdminRepository.save(admin);
    this.logger.log('SuperAdmin created: jefrydep@gmail.com / Iamthebestdeveloper1994@');
  }
}
