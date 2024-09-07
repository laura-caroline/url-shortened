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
exports.UserCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserCreateDto {
}
exports.UserCreateDto = UserCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'emailusuario@gmail.com',
        description: 'E-mail do usuário',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O campo de email deve ser preenchido' }),
    (0, class_validator_1.IsEmail)({}, { message: 'O campo de email deve ser um e-mail válido' }),
    (0, class_validator_1.MaxLength)(200, {
        message: 'O campo de email deve ter menos de 200 caracteres',
    }),
    __metadata("design:type", String)
], UserCreateDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Breno Silva',
        description: 'Nome do usuário',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O campo de nome deve ser preenchido' }),
    (0, class_validator_1.IsString)({ message: 'O campo de nome deve ser uma string' }),
    (0, class_validator_1.MaxLength)(200, {
        message: 'O campo de nome deve ter menos de 200 caracteres',
    }),
    __metadata("design:type", String)
], UserCreateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Senha do usuário na plataforma.',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: "O campo 'Senha' precisa ser preenchido.",
    }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*\d).{8,}$/, {
        message: 'A senha deve conter pelo menos 1 letra maiúscula, 1 caractere especial, 1 número e ter no mínimo 8 caracteres.',
    }),
    __metadata("design:type", String)
], UserCreateDto.prototype, "password", void 0);
//# sourceMappingURL=user.create.dto.js.map