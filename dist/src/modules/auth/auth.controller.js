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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const userToken_dto_1 = require("../user/dto/response/userToken.dto");
const auth_service_1 = require("./auth.service");
const is_public_decorator_1 = require("./decorators/is-public.decorator");
const login_dto_1 = require("./dto/request/login.dto");
const updateRefreshToken_dto_1 = require("./dto/request/updateRefreshToken.dto");
const guards_1 = require("./guards");
const handlerError_1 = require("../../utils/handlerError");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(response, dto) {
        try {
            const loginResponse = await this.authService.login(dto);
            return response.status(common_1.HttpStatus.OK).json(loginResponse);
        }
        catch (err) {
            return (0, handlerError_1.handleError)(response, err);
        }
    }
    async refreshToken(refreshToken, response) {
        try {
            const tokens = await this.authService.refresh(refreshToken);
            return response.status(common_1.HttpStatus.CREATED).send({
                ...tokens,
                message: "Tokens retornados com sucesso",
            });
        }
        catch (err) {
            return (0, handlerError_1.handleError)(response, err);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Efetuar login" }),
    (0, common_1.Post)("login"),
    (0, is_public_decorator_1.IsPublic)(),
    (0, common_1.UseGuards)(guards_1.LocalAuthGuard),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: userToken_dto_1.UserToken,
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Atualizar refresh token" }),
    (0, is_public_decorator_1.IsPublic)(),
    (0, swagger_1.ApiBody)({ type: updateRefreshToken_dto_1.RefreshTokenDto }),
    (0, common_1.Post)("refresh"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)("refreshToken")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    (0, swagger_1.ApiTags)("Auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map