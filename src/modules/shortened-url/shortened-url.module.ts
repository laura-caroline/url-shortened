import { Module } from "@nestjs/common";
import { ShortenedUrlService } from "./shortened-url.service";
import { ShortenedUrlController } from "./shortened-url.controller";
import { ShortenedUrlRepository } from "./shortened-url.repository";
import { PrismaModule } from "src/database/prisma/prisma.module";

@Module({
  controllers: [ShortenedUrlController],
  providers: [ShortenedUrlService, ShortenedUrlRepository],
  exports: [ShortenedUrlService, ShortenedUrlRepository],
  imports: [PrismaModule],
})
export class ShortenedUrlModule {}
