"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEvaluationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_evaluation_dto_1 = require("./create-evaluation.dto");
class UpdateEvaluationDto extends (0, mapped_types_1.PartialType)(create_evaluation_dto_1.CreateEvaluationDto) {
}
exports.UpdateEvaluationDto = UpdateEvaluationDto;
//# sourceMappingURL=update-evaluation.dto.js.map