import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ShortenedUrlRepository } from "./shortened-url.repository";
import { UpdateShortenedUrlDto } from "./dto/request/update-shortened-url.dto";
import { CreateShortenedUrlDto } from "./dto/request/create-shortened-url.dto";
import { randomUUID } from "crypto";

@Injectable()
export class ShortenedUrlService {
  private logger = new Logger(ShortenedUrlService.name);

  constructor(
    private readonly shortenedUrlRepository: ShortenedUrlRepository
  ) {}

  async createShortenedUrl(createShortenedUrlDto: CreateShortenedUrlDto) {
    try {
      createShortenedUrlDto.shortUrl = randomUUID();
      return await this.shortenedUrlRepository.createShortenedUrl(
        createShortenedUrlDto
      );
    } catch (err) {
      this.logger.error(
        `Error ao criar a URL encurtada ${createShortenedUrlDto}`
      );
      throw err;
    }
  }

  async findAllShortenedUrlByUser(userId: string) {
    try {
      return await this.shortenedUrlRepository.listShortenedUrlByUser(userId);
    } catch (err) {
      this.logger.error(
        `Error ao obter todas as url encurtadas para o usuário ${userId}`
      );
      throw err;
    }
  }

  async findOneShortenedUrlByUser(userId: string, idShortenedUrl: string) {
    try {
      return await this.shortenedUrlRepository.findByIdByUser(
        userId,
        idShortenedUrl
      );
    } catch (err) {
      this.logger.error(
        `Error ao obter a URL encurtada do id ${idShortenedUrl} utilizando o usuário ${userId}`
      );
      throw err;
    }
  }

  async updateNumberAccessUrl(idShortenedUrl: string) {
    const alreadyExistShortenedUrl =
      await this.shortenedUrlRepository.findById(idShortenedUrl);

    if (!alreadyExistShortenedUrl) {
      this.logger.debug(
        `URL encurtada com id ${idShortenedUrl} não foi encontrada`
      );
      throw new NotFoundException("URL encurtada não foi encontrada");
    }

    const dataUpdate = {
      ...alreadyExistShortenedUrl,
      countAccessUrl: alreadyExistShortenedUrl.countAccessUrl + 1,
      idShortenedUrl: alreadyExistShortenedUrl.id,
    };

    return await this.shortenedUrlRepository.updateShortenedUrl(
      null,
      dataUpdate
    );
  }

  async updateShortenedUrlByUser(
    userId: string,
    updateShortenedUrlDto: UpdateShortenedUrlDto
  ) {
    try {
      const alreadyExistShortenedUrl =
        await this.shortenedUrlRepository.findByIdByUser(
          userId,
          updateShortenedUrlDto.idShortenedUrl
        );

      if (!alreadyExistShortenedUrl) {
        this.logger.debug(
          `URL encurtada com id ${updateShortenedUrlDto.idShortenedUrl} utilizando o usuário ${userId} não foi encontrada`
        );
        throw new NotFoundException("URL encurtada não foi encontrada");
      }
      updateShortenedUrlDto.shortUrl = randomUUID();
      return await this.shortenedUrlRepository.updateShortenedUrl(
        userId,
        updateShortenedUrlDto
      );
    } catch (err) {
      this.logger.error(
        `Error ao deletar url encurtada com id ${updateShortenedUrlDto.idShortenedUrl} utilizando o usuário ${userId}`
      );
      throw err;
    }
  }

  async removeShortenedUrlByUser(userId: string, shortenedUrlId: string) {
    try {
      const alreadyExistShortenedUrl =
        await this.shortenedUrlRepository.findByIdByUser(
          userId,
          shortenedUrlId
        );

      if (!alreadyExistShortenedUrl) {
        this.logger.debug(
          `URL encurtada com id ${shortenedUrlId} utilizando o usuário ${userId} não foi encontrada`
        );
        throw new NotFoundException("URL encurtada não foi encontrada");
      }
      return await this.shortenedUrlRepository.deleteShortenedUrlByUser(
        userId,
        shortenedUrlId
      );
    } catch (err) {
      this.logger.error(
        `Error ao deletar url encurtada com id ${shortenedUrlId} utilizando o usuário ${userId}`
      );
      throw err;
    }
  }
}
