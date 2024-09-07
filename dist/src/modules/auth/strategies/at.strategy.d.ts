import { UserEntity } from "src/modules/user/entities/user.entity";
declare const AtStrategy_base: new (...args: any[]) => any;
export declare class AtStrategy extends AtStrategy_base {
    constructor();
    validate(request: Request, payload: UserEntity): Promise<{
        id: string;
        email: string;
        name: string;
    }>;
}
export {};
