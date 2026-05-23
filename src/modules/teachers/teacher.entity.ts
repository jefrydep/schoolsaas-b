import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';

@Entity('teachers')
@Unique(['tenantId', 'teacherCode'])
export class Teacher extends BaseEntity {
  @Column({ length: 100, name: 'first_name' })
  firstName!: string;

  @Column({ length: 100, name: 'last_name' })
  lastName!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', length: 50, name: 'teacher_code' })
  teacherCode!: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  specialization!: string | null;

  @Column({ type: 'date', name: 'hire_date' })
  hireDate!: string;

  @Column({ default: true, name: 'is_active' })
  isActive!: boolean;
}
