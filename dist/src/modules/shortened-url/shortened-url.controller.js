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
exports.ShortenedUrlController = void 0;
const common_1 = require("@nestjs/common");
const shortened_url_service_1 = require("./shortened-url.service");
const create_shortened_url_dto_1 = require("./dto/request/create-shortened-url.dto");
const update_shortened_url_dto_1 = require("./dto/request/update-shortened-url.dto");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_entity_1 = require("../user/entities/user.entity");
const is_public_decorator_1 = require("../auth/decorators/is-public.decorator");
const handlerError_1 = require("../../utils/handlerError");
let ShortenedUrlController = class ShortenedUrlController {
    constructor(shortenedUrlService) {
        this.shortenedUrlService = shortenedUrlService;
    }
    async createShortenedUrl(response, currentUser, createShortenedUrlDto) {
        try {
            createShortenedUrlDto.userId = currentUser?.id;
            await this.shortenedUrlService.createShortenedUrl(createShortenedUrlDto);
            return response.status(common_1.HttpStatus.CREATED).send();
        }
        catch (err) {
            return (0, handlerError_1.handleError)(response, err);
        }
    }
    async redirectAndUpdateNumbersAccessUrl(response, shortenedUrlId) {
        try {
            const updateNumberAccessUrl = await this.shortenedUrlService.updateNumberAccessUrl(shortenedUrlId);
            return response.redirect(updateNumberAccessUrl.originalUrl);
        }
        catch (err) {
            return (0, handlerError_1.handleError)(response, err);
        }
    }
    async findAllShortenedUrlByUser(response, currentUser) {
        try {
            const data = await this.shortenedUrlService.findAllShortenedUrlByUser(currentUser.id);
            return response.status(common_1.HttpStatus.OK).json(data);
        }
        catch (err) {
            return (0, handlerError_1.handleError)(response, err);
        }
    }
    async findOneShortenedUrlByUser(response, currentUser, shortenedUrlId) {
        try {
            const data = await this.shortenedUrlService.findOneShortenedUrlByUser(currentUser.id, shortenedUrlId);
            return response.status(common_1.HttpStatus.OK).json(data);
        }
        catch (err) {
            return (0, handlerError_1.handleError)(response, err);
        }
    }
    async updateShortenedUrlByUser(response, currentUser, shortenedUrlId, updateShortenedUrlDto) {
        try {
            updateShortenedUrlDto.idShortenedUrl = shortenedUrlId;
            const data = await this.shortenedUrlService.updateShortenedUrlByUser(currentUser.id, updateShortenedUrlDto);
            return response.status(common_1.HttpStatus.OK).json(data);
        }
        catch (err) {
            return (0, handlerError_1.handleError)(response, err);
        }
    }
    async removeShortenedUrlByUser(response, currentUser, shortenedUrlId) {
        try {
            const data = await this.shortenedUrlService.removeShortenedUrlByUser(currentUser.id, shortenedUrlId);
            return response.status(common_1.HttpStatus.OK).json();
        }
        catch (err) {
            return (0, handlerError_1.handleError)(response, err);
        }
    }
};
exports.ShortenedUrlController = ShortenedUrlController;
__decorate([
    (0, common_1.Post)(),
    (0, is_public_decorator_1.IsPublic)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, current_user_decorator_1.AuthenticatedUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserEntity,
        create_shortened_url_dto_1.CreateShortenedUrlDto]),
    __metadata("design:returntype", Promise)
], ShortenedUrlController.prototype, "createShortenedUrl", null);
__decorate([
    (0, common_1.Get)(":shortUrl"),
    (0, is_public_decorator_1.IsPublic)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("shortenedUrlId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ShortenedUrlController.prototype, "redirectAndUpdateNumbersAccessUrl", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, current_user_decorator_1.AuthenticatedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], ShortenedUrlController.prototype, "findAllShortenedUrlByUser", null);
__decorate([
    (0, common_1.Get)("/find/:shortenedUrlId"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, current_user_decorator_1.AuthenticatedUser)()),
    __param(2, (0, common_1.Param)("shortenedUrlId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], ShortenedUrlController.prototype, "findOneShortenedUrlByUser", null);
__decorate([
    (0, common_1.Patch)(":shortenedUrlId"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, current_user_decorator_1.AuthenticatedUser)()),
    __param(2, (0, common_1.Param)("shortenedUrlId")),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserEntity, String, update_shortened_url_dto_1.UpdateShortenedUrlDto]),
    __metadata("design:returntype", Promise)
], ShortenedUrlController.prototype, "updateShortenedUrlByUser", null);
__decorate([
    (0, common_1.Delete)(":shortenedUrlId"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, current_user_decorator_1.AuthenticatedUser)()),
    __param(2, (0, common_1.Param)("shortenedUrlId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], ShortenedUrlController.prototype, "removeShortenedUrlByUser", null);
exports.ShortenedUrlController = ShortenedUrlController = __decorate([
    (0, common_1.Controller)("shortenedUrl"),
    __metadata("design:paramtypes", [shortened_url_service_1.ShortenedUrlService])
], ShortenedUrlController);
//# sourceMappingURL=shortened-url.controller.js.map