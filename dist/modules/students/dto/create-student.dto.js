"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStudentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateStudentDto {
    firstName;
    lastName;
    email;
    studentCode;
    dateOfBirth;
    birthDistrict;
    birthProvince;
    birthDepartment;
    sex;
    nationality;
    documentType;
    documentNumber;
    cuiCode;
    address;
    phone;
    grade;
    section;
    academicYear;
    admissionType;
    previousSchool;
    enrollmentDate;
    guardianName;
    guardianDocumentNumber;
    relationship;
    occupation;
    guardianPhone;
    guardianEmail;
    bloodType;
    allergies;
    diseases;
    disability;
    insurance;
    socioeconomicLevel;
}
exports.CreateStudentDto = CreateStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Juan', description: 'Nombre del estudiante', maxLength: 100 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pérez', description: 'Apellido del estudiante', maxLength: 100 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'juan.perez@ejemplo.com', description: 'Correo electrónico' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'EST-2026-001', description: 'Código del estudiante', maxLength: 50 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "studentCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2005-03-15', description: 'Fecha de nacimiento (YYYY-MM-DD)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Lima', description: 'Distrito de nacimiento' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "birthDistrict", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Lima', description: 'Provincia de nacimiento' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "birthProvince", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Lima', description: 'Departamento de nacimiento' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "birthDepartment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'M', description: 'Sexo: M o F' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['M', 'F']),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "sex", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Peruana', description: 'Nacionalidad' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "nationality", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'DNI', description: 'Tipo de documento: DNI, Pasaporte, CE' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '12345678', description: 'Número de documento' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026000123456', description: 'Código CUI (MINEDU)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "cuiCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Av. Arequipa 123, Lima', description: 'Dirección completa' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '987654321', description: 'Teléfono de contacto' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '3', description: 'Grado: 1-6 primaria, 1-5 secundaria' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'A', description: 'Sección: A, B, C...' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(5),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "section", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026', description: 'Año académico' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "academicYear", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'nuevo', description: 'Tipo de ingreso: nuevo, reingreso, traslado' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "admissionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'I.E. San Miguel', description: 'Escuela de procedencia' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "previousSchool", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-15', description: 'Fecha de inscripción (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "enrollmentDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'María Pérez', description: 'Nombre del apoderado' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "guardianName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '12345678', description: 'DNI del apoderado' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "guardianDocumentNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Madre', description: 'Parentesco: Padre, Madre, Apoderado, Otro' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ingeniera', description: 'Ocupación del apoderado' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "occupation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '987654321', description: 'Teléfono del apoderado' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "guardianPhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'maria.perez@ejemplo.com', description: 'Email del apoderado' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "guardianEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'O+', description: 'Tipo de sangre' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(5),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Polen, polvo', description: 'Alergias' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "allergies", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Asma', description: 'Enfermedades crónicas' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "diseases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ninguna', description: 'Discapacidad' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "disability", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'SIS', description: 'Seguro: SIS, EsSalud, Privado, Ninguno' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "insurance", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'B', description: 'Nivel socioeconómico: A, B, C, D, E' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "socioeconomicLevel", void 0);
//# sourceMappingURL=create-student.dto.js.map