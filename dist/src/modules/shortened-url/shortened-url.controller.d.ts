import { ShortenedUrlService } from "./shortened-url.service";
import { CreateShortenedUrlDto } from "./dto/request/create-shortened-url.dto";
import { UpdateShortenedUrlDto } from "./dto/request/update-shortened-url.dto";
import { UserEntity } from "../user/entities/user.entity";
import { Response } from "express";
export declare class ShortenedUrlController {
    private readonly shortenedUrlService;
    constructor(shortenedUrlService: ShortenedUrlService);
    createShortenedUrl(response: Response, currentUser: UserEntity, createShortenedUrlDto: CreateShortenedUrlDto): Promise<Response<any, Record<string, any>>>;
    redirectAndUpdateNumbersAccessUrl(response: Response, shortenedUrlId: string): Promise<void | Response<any, Record<string, any>>>;
    findAllShortenedUrlByUser(response: Response, currentUser: UserEntity): Promise<Response<any, Record<string, any>>>;
    findOneShortenedUrlByUser(response: Response, currentUser: UserEntity, shortenedUrlId: string): Promise<Response<any, Record<string, any>>>;
    updateShortenedUrlByUser(response: Response, currentUser: UserEntity, shortenedUrlId: string, updateShortenedUrlDto: UpdateShortenedUrlDto): Promise<Response<any, Record<string, any>>>;
    removeShortenedUrlByUser(response: Response, currentUser: UserEntity, shortenedUrlId: string): Promise<Response<any, Record<string, any>>>;
}
