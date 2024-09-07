"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExceptionResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const BaseExceptionSchema_1 = require("./BaseExceptionSchema");
const ApiExceptionResponse = () => (0, common_1.applyDecorators)((0, swagger_1.ApiBadRequestResponse)({
    type: BaseExceptionSchema_1.BadRequestResponse,
    description: 'Bad Request',
}), (0, swagger_1.ApiConflictResponse)({ type: BaseExceptionSchema_1.ConflictResponse, description: 'Conflict' }), (0, swagger_1.ApiNotFoundResponse)({ type: BaseExceptionSchema_1.NotFoundResponse, description: 'Not Found' }), (0, swagger_1.ApiInternalServerErrorResponse)({
    type: BaseExceptionSchema_1.InternalServerErrorResponse,
    description: 'Internal Server Error',
}));
exports.ApiExceptionResponse = ApiExceptionResponse;
//# sourceMappingURL=SwaggerSchema.js.map