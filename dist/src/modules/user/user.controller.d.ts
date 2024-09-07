import { Response } from "express";
import { UserService } from "./user.service";
import { UserCreateDto } from "./dto/request/user.create.dto";
export declare class UserController {
    protected readonly userService: UserService;
    private readonly logger;
    constructor(userService: UserService);
    protected createAsync(response: Response, dto: UserCreateDto): Promise<Response<any, Record<string, any>>>;
}
