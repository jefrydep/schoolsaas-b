import { faker } from '@faker-js/faker';
import { TenantType, TenantLevel } from '../../common/enums/tenant-type.enum';
import { Role } from '../../common/enums/role.enum';
import { EvaluationType } from '../../common/enums/evaluation-type.enum';
import { EnrollmentStatus } from '../../modules/courses/course-student.entity';

interface SeedData {
  tenants: any[];
  users: any[];
  teachers: any[];
  students: any[];
  courses: any[];
  evaluations: any[];
  courseStudents: any[];
  grades: any[];
}

const TENANT_COUNT = 4;
const TEACHERS_PER_TENANT = 10;
const STUDENTS_PER_TENANT = 50;
const COURSES_PER_TENANT = 5;
const EVALUATIONS_PER_COURSE = 4;
const GRADES_PER_STUDENT = 3;

const PERU_DISTRICTS = ['Lima', 'Miraflores', 'San Isidro', 'Barranco', 'La Molina', 'Surco', 'Ate', 'San Juan de Lurigancho', 'Comas', 'Villa El Salvador'];
const PERU_PROVINCES = ['Lima', 'Lima', 'Lima', 'Lima', 'Lima', 'Lima', 'Lima', 'Lima', 'Lima', 'Lima'];
const PERU_DEPARTMENTS = ['Lima', 'Lima', 'Lima', 'Lima', 'Lima', 'Lima', 'Lima', 'Lima', 'Lima', 'Lima'];

const ECUADOR_CITIES = ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Ibarra', 'Riobamba', 'Manta', 'Portoviejo'];
const ECUADOR_PROVINCES = ['Pichincha', 'Guayas', 'Azuay', 'Tungurahua', 'Imbabura', 'Chimborazo', 'Manabí', 'Manabí'];
const ECUADOR_DEPARTMENTS = ['Pichincha', 'Guayas', 'Azuay', 'Tungurahua', 'Imbabura', 'Chimborazo', 'Manabí', 'Manabí'];

const GRADES = ['1', '2', '3', '4', '5', '6'];
const SECTIONS = ['A', 'B', 'C', 'D'];
const ACADEMIC_YEARS = ['2024', '2025', '2026'];
const ADMISSION_TYPES = ['NUEVO', 'TRASLADO', 'REINGRESO'];
const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const INSURANCE_TYPES = ['ESSALUD', 'SIS', 'PRIVATE', 'IESS', 'MILITARY'];
const SOCIOECONOMIC_LEVELS = ['Bajo', 'Medio', 'Alto'];

const EVALUATION_TYPES = [EvaluationType.EXAM, EvaluationType.QUIZ, EvaluationType.PROJECT, EvaluationType.HOMEWORK];

const SPECIALIZATIONS = [
  'Matemáticas', 'Comunicación', 'Ciencias', 'Historia', 'Geografía',
  'Educación Física', 'Arte', 'Música', 'Inglés', 'Religión',
  'Física', 'Química', 'Biología', 'Literatura', 'Filosofía',
  'Programación', 'Base de Datos', 'Redes', 'Electrónica', 'Mecánica'
];

const COURSE_NAMES = [
  'Matemáticas', 'Comunicación', 'Ciencias Naturales', 'Ciencias Sociales',
  'Historia del Perú', 'Geografía', 'Educación Física', 'Arte', 'Música',
  'Inglés', 'Computación', 'Religión', 'Física', 'Química', 'Biología',
  'Literatura', 'Educación Cívica', 'Proyectos', 'Ética', 'Taller de Lectura'
];

export function generateSeedData(): SeedData {
  const tenants: any[] = [];
  const users: any[] = [];
  const teachers: any[] = [];
  const students: any[] = [];
  const courses: any[] = [];
  const evaluations: any[] = [];
  const courseStudents: any[] = [];
  const grades: any[] = [];

  const tenantNames = [
    { name: 'Colegio San Martín de Porres', subdomain: 'sanmarin', country: 'peru' },
    { name: 'Colegio Nacional de la Universidad', subdomain: 'cnulima', country: 'peru' },
    { name: 'Unidad Educativa del Ecuador', subdomain: 'uedue', country: 'ecuador' },
    { name: 'Instituto Técnico del Norte', subdomain: 'itn', country: 'ecuador' },
  ];

  const tenantTypeMap: Record<string, TenantType> = {
    'sanmarin': TenantType.INSTITUCION,
    'cnulima': TenantType.INSTITUCION,
    'uedue': TenantType.INSTITUCION,
    'itn': TenantType.INSTITUTO,
  };

  const tenantLevelMap: Record<string, TenantLevel> = {
    'sanmarin': TenantLevel.SECUNDARIA,
    'cnulima': TenantLevel.SECUNDARIA,
    'uedue': TenantLevel.PRIMARIA,
    'itn': TenantLevel.SUPERIOR,
  };

  const tenantAddresses = [
    'Av. Brasil 1234, Lima',
    'Av. Arenales 567, Lima',
    'Calle Quito 890, Ibarra',
    'Av. Amazonas 1234, Ibarra',
  ];

  for (let i = 0; i < TENANT_COUNT; i++) {
    const tData = tenantNames[i];
    const tenant = {
      name: tData.name,
      subdomain: tData.subdomain,
      logo: null,
      legalName: `${tData.name} S.A.C.`,
      ruc: faker.string.numeric(11),
      modularCode: `MOD${faker.string.numeric(3)}`,
      type: tenantTypeMap[tData.subdomain],
      level: tenantLevelMap[tData.subdomain],
      address: tenantAddresses[i],
      district: tData.country === 'peru' ? PERU_DISTRICTS[i % PERU_DISTRICTS.length] : ECUADOR_CITIES[i % ECUADOR_CITIES.length],
      province: tData.country === 'peru' ? PERU_PROVINCES[i % PERU_PROVINCES.length] : ECUADOR_PROVINCES[i % ECUADOR_PROVINCES.length],
      department: tData.country === 'peru' ? PERU_DEPARTMENTS[i % PERU_DEPARTMENTS.length] : ECUADOR_DEPARTMENTS[i % ECUADOR_DEPARTMENTS.length],
      phone: faker.phone.number(),
      email: faker.internet.email().toLowerCase(),
      directorName: faker.person.fullName(),
      isActive: true,
      settings: { theme: 'blue', language: tData.country === 'peru' ? 'es' : 'es' },
    };
    tenants.push(tenant);

    const adminEmail = `admin@${tData.subdomain}.edu.${tData.country === 'peru' ? 'pe' : 'ec'}`;
    users.push({
      email: adminEmail,
      password: 'Admin123!',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: Role.ADMIN,
      tenantIndex: i,
    });

    for (let j = 0; j < 3; j++) {
      const profEmail = `profesor${i * 3 + j + 1}@${tData.subdomain}.edu.${tData.country === 'peru' ? 'pe' : 'ec'}`;
      users.push({
        email: profEmail,
        password: 'Profesor123!',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        role: Role.PROFESOR,
        tenantIndex: i,
      });
    }
  }

  let globalTeacherIndex = 0;
  for (let tenantIdx = 0; tenantIdx < TENANT_COUNT; tenantIdx++) {
    for (let j = 0; j < TEACHERS_PER_TENANT; j++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      teachers.push({
        firstName,
        lastName,
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        teacherCode: `T${String(globalTeacherIndex + 1).padStart(3, '0')}`,
        specialization: SPECIALIZATIONS[globalTeacherIndex % SPECIALIZATIONS.length],
        hireDate: faker.date.past({ years: 10 }).toISOString().split('T')[0],
        isActive: true,
        tenantIndex: tenantIdx,
      });
      globalTeacherIndex++;
    }
  }

  let globalStudentIndex = 0;
  for (let tenantIdx = 0; tenantIdx < TENANT_COUNT; tenantIdx++) {
    const tData = tenantNames[tenantIdx];
    for (let j = 0; j < STUDENTS_PER_TENANT; j++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const isPeru = tData.country === 'peru';

      students.push({
        firstName,
        lastName,
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        studentCode: `S${String(globalStudentIndex + 1).padStart(5, '0')}`,
        dateOfBirth: faker.date.between({ from: '2005-01-01', to: '2012-12-31' }).toISOString().split('T')[0],
        birthDistrict: isPeru ? PERU_DISTRICTS[Math.floor(Math.random() * PERU_DISTRICTS.length)] : ECUADOR_CITIES[Math.floor(Math.random() * ECUADOR_CITIES.length)],
        birthProvince: isPeru ? PERU_PROVINCES[Math.floor(Math.random() * PERU_PROVINCES.length)] : ECUADOR_PROVINCES[Math.floor(Math.random() * ECUADOR_PROVINCES.length)],
        birthDepartment: isPeru ? PERU_DEPARTMENTS[Math.floor(Math.random() * PERU_DEPARTMENTS.length)] : ECUADOR_DEPARTMENTS[Math.floor(Math.random() * ECUADOR_DEPARTMENTS.length)],
        sex: Math.random() > 0.5 ? 'M' : 'F',
        nationality: isPeru ? 'Peruana' : 'Ecuatoriana',
        documentType: isPeru ? 'DNI' : 'CÉDULA',
        documentNumber: isPeru ? faker.string.numeric(8) : faker.string.numeric(10),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        grade: GRADES[Math.floor(Math.random() * GRADES.length)],
        section: SECTIONS[Math.floor(Math.random() * SECTIONS.length)],
        academicYear: ACADEMIC_YEARS[ACADEMIC_YEARS.length - 1],
        admissionType: ADMISSION_TYPES[Math.floor(Math.random() * ADMISSION_TYPES.length)],
        previousSchool: `${faker.company.name()} ${faker.location.city()}`,
        enrollmentDate: faker.date.past({ years: 1 }).toISOString().split('T')[0],
        guardianName: faker.person.fullName(),
        guardianDocumentNumber: isPeru ? faker.string.numeric(8) : faker.string.numeric(10),
        relationship: ['Padre', 'Madre', 'Tutor'].pop()!,
        occupation: faker.person.jobTitle(),
        guardianPhone: faker.phone.number(),
        guardianEmail: faker.internet.email().toLowerCase(),
        bloodType: BLOOD_TYPES[Math.floor(Math.random() * BLOOD_TYPES.length)],
        allergies: Math.random() > 0.7 ? faker.lorem.sentence() : null,
        diseases: Math.random() > 0.8 ? faker.lorem.sentence() : null,
        disability: Math.random() > 0.9 ? faker.lorem.sentence() : null,
        insurance: INSURANCE_TYPES[Math.floor(Math.random() * INSURANCE_TYPES.length)],
        socioeconomicLevel: SOCIOECONOMIC_LEVELS[Math.floor(Math.random() * SOCIOECONOMIC_LEVELS.length)],
        isActive: true,
        tenantIndex: tenantIdx,
      });
      globalStudentIndex++;
    }
  }

  let globalCourseIndex = 0;
  let tenantTeacherIndices = [0, 0, 0, 0];
  for (let tenantIdx = 0; tenantIdx < TENANT_COUNT; tenantIdx++) {
    for (let j = 0; j < COURSES_PER_TENANT; j++) {
      const teacherIndex = TEACHERS_PER_TENANT * tenantIdx + (tenantTeacherIndices[tenantIdx] % TEACHERS_PER_TENANT);
      courses.push({
        name: COURSE_NAMES[globalCourseIndex % COURSE_NAMES.length] + (j > COURSE_NAMES.length - 1 ? ` ${Math.floor(j / COURSE_NAMES.length) + 1}` : ''),
        code: `CUR${String(globalCourseIndex + 1).padStart(3, '0')}`,
        description: faker.lorem.sentence(),
        academicPeriod: '2026-I',
        credits: Math.floor(Math.random() * 4) + 2,
        maxStudents: 30 + Math.floor(Math.random() * 20),
        isActive: true,
        tenantIndex: tenantIdx,
        teacherIndex,
      });
      tenantTeacherIndices[tenantIdx]++;
      globalCourseIndex++;
    }
  }

  let globalEvalIndex = 0;
  const evaluationNames = ['Examen Parcial 1', 'Examen Parcial 2', 'Quiz 1', 'Quiz 2', 'Proyecto', 'Tarea', 'Práctica'];
  for (let courseIdx = 0; courseIdx < courses.length; courseIdx++) {
    for (let j = 0; j < EVALUATIONS_PER_COURSE; j++) {
      const maxScore = 20;
      evaluations.push({
        name: evaluationNames[j] || `Evaluación ${j + 1}`,
        description: faker.lorem.sentence(),
        type: EVALUATION_TYPES[j % EVALUATION_TYPES.length],
        maxScore,
        weight: parseFloat((0.15 + Math.random() * 0.15).toFixed(2)),
        date: faker.date.between({ from: '2026-03-01', to: '2026-06-30' }).toISOString().split('T')[0],
        isActive: true,
        courseIndex: courseIdx,
        tenantIndex: courses[courseIdx].tenantIndex,
      });
      globalEvalIndex++;
    }
  }

  const studentTenantIndices: number[][] = [];
  for (let tenantIdx = 0; tenantIdx < TENANT_COUNT; tenantIdx++) {
    const start = tenantIdx * STUDENTS_PER_TENANT;
    const end = start + STUDENTS_PER_TENANT;
    studentTenantIndices.push([start, end]);
  }

  const courseTenantIndices: number[][] = [];
  for (let tenantIdx = 0; tenantIdx < TENANT_COUNT; tenantIdx++) {
    const start = tenantIdx * COURSES_PER_TENANT;
    const end = start + COURSES_PER_TENANT;
    courseTenantIndices.push([start, end]);
  }

  let enrollmentCount = 0;
  for (let tenantIdx = 0; tenantIdx < TENANT_COUNT; tenantIdx++) {
    const [studentStart, studentEnd] = studentTenantIndices[tenantIdx];
    const [courseStart, courseEnd] = courseTenantIndices[tenantIdx];

    for (let studentIdx = studentStart; studentIdx < studentEnd; studentIdx++) {
      const courseCount = 2 + Math.floor(Math.random() * 2);
      const selectedCourses = new Set<number>();

      while (selectedCourses.size < courseCount) {
        const courseIdx = courseStart + Math.floor(Math.random() * (courseEnd - courseStart));
        selectedCourses.add(courseIdx);
      }

      for (const courseIdx of selectedCourses) {
        courseStudents.push({
          status: EnrollmentStatus.ENROLLED,
          studentIndex: studentIdx,
          courseIndex: courseIdx,
          tenantIndex: tenantIdx,
        });
        enrollmentCount++;
      }
    }
  }

  for (const enrollment of courseStudents) {
    const courseIdx = enrollment.courseIndex;
    const courseTenantIdx = courses[courseIdx].tenantIndex;
    const [evalStart, evalEnd] = [courseIdx * EVALUATIONS_PER_COURSE, (courseIdx + 1) * EVALUATIONS_PER_COURSE];

    const evalCount = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < evalCount; i++) {
      const evalIndex = evalStart + Math.floor(Math.random() * (evalEnd - evalStart));
      const score = parseFloat((8 + Math.random() * 12).toFixed(2));

      grades.push({
        score,
        isAutomatic: false,
        studentIndex: enrollment.studentIndex,
        evaluationIndex: evalIndex,
        tenantIndex: courseTenantIdx,
      });
    }
  }

  return {
    tenants,
    users,
    teachers,
    students,
    courses,
    evaluations,
    courseStudents,
    grades,
  };
}

export const seedData = generateSeedData();