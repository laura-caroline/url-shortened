import { PrismaService } from "src/database/prisma/prisma.service";
import { ShortenedUrlEntity } from "./entities/shortened-url.entity";
import { CreateShortenedUrlDto } from "./dto/request/create-shortened-url.dto";
import { UpdateShortenedUrlDto } from "./dto/request/update-shortened-url.dto";
export declare class ShortenedUrlRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createShortenedUrl(data: CreateShortenedUrlDto): Promise<ShortenedUrlEntity>;
    updateShortenedUrl(userId: string, data: UpdateShortenedUrlDto): Promise<ShortenedUrlEntity>;
    findById(idShortenedUrl: string): Promise<ShortenedUrlEntity>;
    findByIdByUser(userId: string, idShortenedUrl: string): Promise<ShortenedUrlEntity>;
    listShortenedUrlByUser(userId: string): Promise<ShortenedUrlEntity[]>;
    deleteShortenedUrlByUser(userId: string, shortenedUrlId: string): Promise<ShortenedUrlEntity>;
}
