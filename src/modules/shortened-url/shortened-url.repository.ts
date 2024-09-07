import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { ShortenedUrlEntity } from "./entities/shortened-url.entity";
import { CreateShortenedUrlDto } from "./dto/request/create-shortened-url.dto";
import { UpdateShortenedUrlDto } from "./dto/request/update-shortened-url.dto";

@Injectable()
export class ShortenedUrlRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createShortenedUrl(
    data: CreateShortenedUrlDto
  ): Promise<ShortenedUrlEntity> {
    return await this.prisma.shortenedUrl.create({
      data: {
        originalUrl: data.originalUrl,
        shortUrl: data.shortUrl,
      },
    });
  }

  async updateShortenedUrl(
    userId: string,
    data: UpdateShortenedUrlDto
  ): Promise<ShortenedUrlEntity> {
    return await this.prisma.shortenedUrl.update({
      where: {
        ...(userId && { userId }),
        id: data.idShortenedUrl,
        deletedAt: null,
      },
      data: {
        countAccessUrl: data.countAccessUrl,
        updatedAt: new Date(),
      },
    });
  }

  async findById(idShortenedUrl: string): Promise<ShortenedUrlEntity> {
    return await this.prisma.shortenedUrl.findFirst({
      where: {
        id: idShortenedUrl,
        deletedAt: null,
      },
    });
  }
  async findByIdByUser(
    userId: string,
    idShortenedUrl: string
  ): Promise<ShortenedUrlEntity> {
    return await this.prisma.shortenedUrl.findFirst({
      where: {
        id: idShortenedUrl,
        userId,
        deletedAt: null,
      },
    });
  }

  async listShortenedUrlByUser(userId: string): Promise<ShortenedUrlEntity[]> {
    return await this.prisma.shortenedUrl.findMany({
      where: {
        userId: userId,
        deletedAt: null,
      },
    });
  }

  async deleteShortenedUrlByUser(
    userId: string,
    shortenedUrlId: string
  ): Promise<ShortenedUrlEntity> {
    return await this.prisma.shortenedUrl.update({
      where: {
        userId: userId,
        id: shortenedUrlId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
