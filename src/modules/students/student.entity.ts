import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';

@Entity('students')
@Unique(['tenantId', 'studentCode'])
export class Student extends BaseEntity {
  @Column({ length: 100, name: 'first_name' })
  firstName!: string;

  @Column({ length: 100, name: 'last_name' })
  lastName!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string | null;

  @Column({ length: 50, name: 'student_code' })
  studentCode!: string;

  @Column({ type: 'date', nullable: true, name: 'date_of_birth' })
  dateOfBirth!: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'birth_district' })
  birthDistrict!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'birth_province' })
  birthProvince!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'birth_department' })
  birthDepartment!: string | null;

  @Column({ type: 'varchar', length: 1, nullable: true })
  sex!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nationality!: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'document_type' })
  documentType!: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'document_number' })
  documentNumber!: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'cui_code' })
  cuiCode!: string | null;

  @Column({ type: 'text', nullable: true })
  address!: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'grade' })
  grade!: string | null;

  @Column({ type: 'varchar', length: 5, nullable: true })
  section!: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'academic_year' })
  academicYear!: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true, name: 'admission_type' })
  admissionType!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'previous_school' })
  previousSchool!: string | null;

  @Column({ type: 'date', name: 'enrollment_date' })
  enrollmentDate!: string;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'guardian_name' })
  guardianName!: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'guardian_document_number' })
  guardianDocumentNumber!: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  relationship!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  occupation!: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'guardian_phone' })
  guardianPhone!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'guardian_email' })
  guardianEmail!: string | null;

  @Column({ type: 'varchar', length: 5, nullable: true, name: 'blood_type' })
  bloodType!: string | null;

  @Column({ type: 'text', nullable: true })
  allergies!: string | null;

  @Column({ type: 'text', nullable: true })
  diseases!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  disability!: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  insurance!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'socioeconomic_level' })
  socioeconomicLevel!: string | null;

  @Column({ default: true, name: 'is_active' })
  isActive!: boolean;
}