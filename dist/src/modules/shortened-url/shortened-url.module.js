"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenedUrlModule = void 0;
const common_1 = require("@nestjs/common");
const shortened_url_service_1 = require("./shortened-url.service");
const shortened_url_controller_1 = require("./shortened-url.controller");
const shortened_url_repository_1 = require("./shortened-url.repository");
const prisma_module_1 = require("../../database/prisma/prisma.module");
let ShortenedUrlModule = class ShortenedUrlModule {
};
exports.ShortenedUrlModule = ShortenedUrlModule;
exports.ShortenedUrlModule = ShortenedUrlModule = __decorate([
    (0, common_1.Module)({
        controllers: [shortened_url_controller_1.ShortenedUrlController],
        providers: [shortened_url_service_1.ShortenedUrlService, shortened_url_repository_1.ShortenedUrlRepository],
        exports: [shortened_url_service_1.ShortenedUrlService, shortened_url_repository_1.ShortenedUrlRepository],
        imports: [prisma_module_1.PrismaModule],
    })
], ShortenedUrlModule);
//# sourceMappingURL=shortened-url.module.js.map