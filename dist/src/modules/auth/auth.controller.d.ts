import { Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/request/login.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(response: Response, dto: LoginDto): Promise<Response<any, Record<string, any>>>;
    refreshToken(refreshToken: string, response: Response): Promise<Response<any, Record<string, any>>>;
}
