import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';
import { EvaluationType } from '../../common/enums/evaluation-type.enum';

@Entity('evaluations')
export class Evaluation extends BaseEntity {
  @Column({ type: 'uuid', name: 'course_id' })
  courseId!: string;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'enum', enum: EvaluationType })
  type!: EvaluationType;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'max_score' })
  maxScore!: number;

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  weight!: number;

  @Column({ type: 'date' })
  date!: string;

  @Column({ default: true, name: 'is_active' })
  isActive!: boolean;
}
