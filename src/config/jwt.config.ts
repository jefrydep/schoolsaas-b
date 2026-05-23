import { JwtModuleOptions } from '@nestjs/jwt';

export function jwtConfig(): JwtModuleOptions {
  return {
    secret: process.env.JWT_SECRET || 'super-secret-key-change-in-production',
    signOptions: {
      expiresIn: '8h',
    },
  };
}
