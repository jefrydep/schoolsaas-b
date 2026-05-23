import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';

@Entity('grades')
@Unique(['tenantId', 'evaluationId', 'studentId'])
export class Grade extends BaseEntity {
  @Column({ type: 'uuid', name: 'evaluation_id' })
  evaluationId!: string;

  @Column({ type: 'uuid', name: 'student_id' })
  studentId!: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  score!: number;

  @Column({ default: false, name: 'is_automatic' })
  isAutomatic!: boolean;
}
