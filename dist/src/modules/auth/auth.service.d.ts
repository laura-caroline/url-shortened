import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { UserService } from "src/modules/user/user.service";
import { UserToken } from "../user/dto/response/userToken.dto";
import { AuthRepository } from "./auth.repository";
import { LoginDto } from "./dto/request/login.dto";
export declare class AuthService {
    private readonly authRepository;
    private readonly userService;
    private readonly jwtService;
    private logger;
    constructor(authRepository: AuthRepository, userService: UserService, jwtService: JwtService);
    updateRefreshToken(userId: string, refreshToken: string): Promise<string>;
    refresh(refreshToken: string): Promise<UserToken>;
    getTokens(user: UserEntity): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(user: LoginDto): Promise<UserToken>;
    validateUser(email: string, password: string): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        refreshToken: string;
        updatedAt: Date;
        deletedAt: Date;
    }>;
}
