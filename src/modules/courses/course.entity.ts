import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';

@Entity('courses')
@Unique(['tenantId', 'code'])
export class Course extends BaseEntity {
  @Column({ type: 'uuid', name: 'teacher_id', nullable: true })
  teacherId!: string | null;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({ type: 'varchar', length: 50 })
  code!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'varchar', length: 50, name: 'academic_period' })
  academicPeriod!: string;

  @Column({ default: 1 })
  credits!: number;

  @Column({ default: 30, name: 'max_students' })
  maxStudents!: number;

  @Column({ default: true, name: 'is_active' })
  isActive!: boolean;
}
