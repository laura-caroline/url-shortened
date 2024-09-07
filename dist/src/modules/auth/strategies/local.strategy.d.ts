import { Request } from "express";
import { AuthService } from "../auth.service";
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(request: Request, email: string, password: string): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        refreshToken: string;
        updatedAt: Date;
        deletedAt: Date;
    }>;
}
export {};
