"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_seeder_1 = require("./seeds/database.seeder");
const tenant_entity_1 = require("../modules/tenants/tenant.entity");
const user_entity_1 = require("../modules/users/user.entity");
const teacher_entity_1 = require("../modules/teachers/teacher.entity");
const student_entity_1 = require("../modules/students/student.entity");
const course_entity_1 = require("../modules/courses/course.entity");
const evaluation_entity_1 = require("../modules/evaluations/evaluation.entity");
const grade_entity_1 = require("../modules/grades/grade.entity");
const course_student_entity_1 = require("../modules/courses/course-student.entity");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                tenant_entity_1.Tenant,
                user_entity_1.User,
                teacher_entity_1.Teacher,
                student_entity_1.Student,
                course_entity_1.Course,
                evaluation_entity_1.Evaluation,
                grade_entity_1.Grade,
                course_student_entity_1.CourseStudent,
            ]),
        ],
        providers: [database_seeder_1.DatabaseSeeder],
        exports: [database_seeder_1.DatabaseSeeder],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map