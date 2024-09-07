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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const hash_1 = require("../../utils/hash");
const auth_repository_1 = require("./auth.repository");
const bcrypt = require("bcrypt");
let AuthService = AuthService_1 = class AuthService {
    constructor(authRepository, userService, jwtService) {
        this.authRepository = authRepository;
        this.userService = userService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async updateRefreshToken(userId, refreshToken) {
        const refreshTokenHash = await (0, hash_1.hashData)(refreshToken);
        const user = await this.authRepository.updateRefreshToken(userId, refreshTokenHash);
        return refreshTokenHash;
    }
    async refresh(refreshToken) {
        const user = await this.authRepository.findUserByRefreshToken(refreshToken);
        if (!user) {
            throw new common_1.NotFoundException(`Usuário com o refesh ${this.refresh} não foi encontrado `);
        }
        const tokens = await this.getTokens(user);
        const refreshUpdated = await this.updateRefreshToken(user.id, tokens.refreshToken);
        tokens.refreshToken = refreshUpdated;
        return tokens;
    }
    async getTokens(user) {
        const { password, ...userWithoutPassword } = user;
        const payload = {
            sub: user.id,
            ...userWithoutPassword,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.AT_SECRET,
                expiresIn: process.env.JWT_ACCESS_LIFETIME,
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.RT_SECRET,
                expiresIn: process.env.JWT_REFRESH_LIFETIME,
            }),
        ]);
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }
    async login(user) {
        try {
            const userByEmail = await this.userService.findByEmail(user.email);
            const tokens = await this.getTokens(userByEmail);
            const refreshTokenUpdated = await this.updateRefreshToken(userByEmail.id, tokens.refreshToken);
            tokens.refreshToken = refreshTokenUpdated;
            return tokens;
        }
        catch (error) {
            this.logger.error(`Error ao efetuar o login ${error.message}`);
            throw error;
        }
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException("E-mail e/ou senha inválidos");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map