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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const rxjs_1 = require("rxjs");
const hash_1 = require("../../utils/hash");
let UserService = UserService_1 = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async createUser(data) {
        try {
            const alreadyExistsUserThisEmail = await this.userRepository.findByEmail(data.email);
            if (alreadyExistsUserThisEmail) {
                throw new rxjs_1.NotFoundError(`Usuário já existe com esse email ${data.email}`);
            }
            const passwordEncrypted = await (0, hash_1.hashData)(data.password);
            data.password = passwordEncrypted;
            return await this.userRepository.createUser(data);
        }
        catch (err) {
            this.logger.error(`Error ao criar um usuário com ${data}: ${err.message}`);
            throw err;
        }
    }
    async findById(id) {
        try {
            return await this.userRepository.findById(id);
        }
        catch (err) {
            this.logger.error(`Error ao buscar usuário com id ${id}: ${err.message}`);
            throw err;
        }
    }
    async findByEmail(email) {
        try {
            return await this.userRepository.findByEmail(email);
        }
        catch (err) {
            this.logger.error(`Error ao buscar um usuário com email ${email}, ${err.message}`);
            throw err;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map