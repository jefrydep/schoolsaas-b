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
exports.Grade = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/base/base.entity");
let Grade = class Grade extends base_entity_1.BaseEntity {
    evaluationId;
    studentId;
    score;
    isAutomatic;
};
exports.Grade = Grade;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'evaluation_id' }),
    __metadata("design:type", String)
], Grade.prototype, "evaluationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'student_id' }),
    __metadata("design:type", String)
], Grade.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Grade.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, name: 'is_automatic' }),
    __metadata("design:type", Boolean)
], Grade.prototype, "isAutomatic", void 0);
exports.Grade = Grade = __decorate([
    (0, typeorm_1.Entity)('grades'),
    (0, typeorm_1.Unique)(['tenantId', 'evaluationId', 'studentId'])
], Grade);
//# sourceMappingURL=grade.entity.js.map