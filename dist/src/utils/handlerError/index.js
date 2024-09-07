"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const rxjs_1 = require("rxjs");
const unauthorized_error_1 = require("../../modules/auth/errors/unauthorized.error");
const common_1 = require("@nestjs/common");
const handleError = (response, error) => {
    if (error instanceof unauthorized_error_1.UnauthorizedError) {
        return response.status(common_1.HttpStatus.UNAUTHORIZED).json({
            error: "Unauthorized access",
            details: error.message,
        });
    }
    else if (error instanceof rxjs_1.NotFoundError) {
        return response.status(common_1.HttpStatus.NOT_FOUND).json({
            error: "Resource not found",
            details: error.message,
        });
    }
    else {
        return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Internal server error",
            details: error.message,
        });
    }
};
exports.handleError = handleError;
//# sourceMappingURL=index.js.map