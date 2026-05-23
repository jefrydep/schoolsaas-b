import { BaseEntity } from '../../common/base/base.entity';
export declare enum EnrollmentStatus {
    ENROLLED = "ENROLLED",
    DROPPED = "DROPPED",
    COMPLETED = "COMPLETED"
}
export declare class CourseStudent extends BaseEntity {
    courseId: string;
    studentId: string;
    status: EnrollmentStatus;
    enrolledAt: Date;
}
