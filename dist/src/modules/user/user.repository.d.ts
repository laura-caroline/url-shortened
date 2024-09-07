import { PrismaService } from "src/database/prisma/prisma.service";
import { UserCreateDto } from "./dto/request/user.create.dto";
import { UserEntity } from "./entities/user.entity";
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(data: UserCreateDto): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    findById(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string | null;
        createdAt: Date;
        refreshToken: string | null;
        updatedAt: Date | null;
        deletedAt: Date | null;
    }>;
}
