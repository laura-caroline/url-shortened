import { ShortenedUrl } from "@prisma/client";
export declare class ShortenedUrlEntity implements ShortenedUrl {
    id: string;
    originalUrl: string;
    shortUrl: string;
    userId: string;
    createdAt: Date;
    countAccessUrl: number;
    refreshToken: string;
    updatedAt: Date;
    deletedAt: Date;
}
