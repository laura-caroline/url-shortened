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
exports.UpdateShortenedUrlDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_shortened_url_dto_1 = require("./create-shortened-url.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateShortenedUrlDto extends (0, mapped_types_1.PartialType)(create_shortened_url_dto_1.CreateShortenedUrlDto) {
}
exports.UpdateShortenedUrlDto = UpdateShortenedUrlDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "1",
        description: "ID da URL encurtada",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O Id da url encurtada  é obrigatório" }),
    __metadata("design:type", String)
], UpdateShortenedUrlDto.prototype, "idShortenedUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateShortenedUrlDto.prototype, "countAccessUrl", void 0);
//# sourceMappingURL=update-shortened-url.dto.js.map