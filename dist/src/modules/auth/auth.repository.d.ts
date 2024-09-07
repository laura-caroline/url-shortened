import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserEntity } from '../user/entities/user.entity';
export declare class AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    updateRefreshToken(userId: string, refreshToken: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string | null;
        createdAt: Date;
        refreshToken: string | null;
        updatedAt: Date | null;
        deletedAt: Date | null;
    }>;
    findUserByRefreshToken(refreshToken: string): Promise<UserEntity>;
}
