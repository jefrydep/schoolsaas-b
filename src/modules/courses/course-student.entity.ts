import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';

export enum EnrollmentStatus {
  ENROLLED = 'ENROLLED',
  DROPPED = 'DROPPED',
  COMPLETED = 'COMPLETED',
}

@Entity('course_students')
@Unique(['tenantId', 'courseId', 'studentId'])
export class CourseStudent extends BaseEntity {
  @Column({ type: 'uuid', name: 'course_id' })
  courseId!: string;

  @Column({ type: 'uuid', name: 'student_id' })
  studentId!: string;

  @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.ENROLLED,
  })
  status!: EnrollmentStatus;

  @Column({ type: 'timestamp', default: () => 'NOW()', name: 'enrolled_at' })
  enrolledAt!: Date;
}
