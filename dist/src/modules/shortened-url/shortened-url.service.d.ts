import { ShortenedUrlRepository } from "./shortened-url.repository";
import { UpdateShortenedUrlDto } from "./dto/request/update-shortened-url.dto";
import { CreateShortenedUrlDto } from "./dto/request/create-shortened-url.dto";
export declare class ShortenedUrlService {
    private readonly shortenedUrlRepository;
    private logger;
    constructor(shortenedUrlRepository: ShortenedUrlRepository);
    createShortenedUrl(createShortenedUrlDto: CreateShortenedUrlDto): Promise<import("./entities/shortened-url.entity").ShortenedUrlEntity>;
    findAllShortenedUrlByUser(userId: string): Promise<import("./entities/shortened-url.entity").ShortenedUrlEntity[]>;
    findOneShortenedUrlByUser(userId: string, idShortenedUrl: string): Promise<import("./entities/shortened-url.entity").ShortenedUrlEntity>;
    updateNumberAccessUrl(idShortenedUrl: string): Promise<import("./entities/shortened-url.entity").ShortenedUrlEntity>;
    updateShortenedUrlByUser(userId: string, updateShortenedUrlDto: UpdateShortenedUrlDto): Promise<import("./entities/shortened-url.entity").ShortenedUrlEntity>;
    removeShortenedUrlByUser(userId: string, shortenedUrlId: string): Promise<import("./entities/shortened-url.entity").ShortenedUrlEntity>;
}
