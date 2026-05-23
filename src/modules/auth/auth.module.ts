import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { TenantsModule } from '../tenants/tenants.module';
import { jwtConfig } from '../../config/jwt.config';
import { SuperAdmin } from './super-admin.entity';
import { User } from '../users/user.entity';
import { SuperAdminsService } from './super-admins.service';
import { SuperAdminsController } from './super-admins.controller';
import { PasswordResetToken } from './password-reset-token.entity';
import { EmailService } from './email.service';

@Module({
  imports: [
    UsersModule,
    TenantsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtConfig()),
    TypeOrmModule.forFeature([SuperAdmin, User, PasswordResetToken]),
  ],
  controllers: [AuthController, SuperAdminsController],
  providers: [AuthService, JwtStrategy, SuperAdminsService, EmailService],
  exports: [AuthService],
})
export class AuthModule {}