"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedUser = void 0;
const common_1 = require("@nestjs/common");
exports.AuthenticatedUser = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    if (request.user && request.user.id) {
        return request.user;
    }
    return null;
});
//# sourceMappingURL=current-user.decorator.js.map