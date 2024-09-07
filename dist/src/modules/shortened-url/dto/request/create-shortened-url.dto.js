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
exports.CreateShortenedUrlDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateShortenedUrlDto {
}
exports.CreateShortenedUrlDto = CreateShortenedUrlDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "www.google.com",
        description: "URL de origem",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "A URL de origem é obrigatória" }),
    __metadata("design:type", String)
], CreateShortenedUrlDto.prototype, "originalUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateShortenedUrlDto.prototype, "shortUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateShortenedUrlDto.prototype, "userId", void 0);
//# sourceMappingURL=create-shortened-url.dto.js.map