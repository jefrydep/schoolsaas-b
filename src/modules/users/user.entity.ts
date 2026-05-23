import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';
import { Role } from '../../common/enums/role.enum';

@Entity('users')
@Unique(['tenantId', 'email'])
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 255, name: 'password_hash' })
  passwordHash!: string;

  @Column({ type: 'varchar', length: 100, name: 'first_name' })
  firstName!: string;

  @Column({ type: 'varchar', length: 100, name: 'last_name' })
  lastName!: string;

  @Column({ type: 'enum', enum: Role })
  role!: Role;

  @Column({ default: true, name: 'is_active' })
  isActive!: boolean;
}
