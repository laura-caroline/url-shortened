import { UserRepository } from "./user.repository";
import { UserCreateDto } from "./dto/request/user.create.dto";
import { UserEntity } from "./entities/user.entity";
export declare class UserService {
    private readonly userRepository;
    private logger;
    constructor(userRepository: UserRepository);
    createUser(data: UserCreateDto): Promise<UserEntity>;
    findById(id: string): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
}
