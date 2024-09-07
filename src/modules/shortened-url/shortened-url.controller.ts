import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  HttpStatus,
} from "@nestjs/common";
import { ShortenedUrlService } from "./shortened-url.service";
import { CreateShortenedUrlDto } from "./dto/request/create-shortened-url.dto";
import { UpdateShortenedUrlDto } from "./dto/request/update-shortened-url.dto";
import { AuthenticatedUser } from "../auth/decorators/current-user.decorator";
import { UserEntity } from "../user/entities/user.entity";
import { IsPublic } from "../auth/decorators/is-public.decorator";
import { handleError } from "src/utils/handlerError";
import { Response } from "express";

@Controller("shortenedUrl")
export class ShortenedUrlController {
  constructor(private readonly shortenedUrlService: ShortenedUrlService) {}

  @Post()
  @IsPublic()
  async createShortenedUrl(
    @Res() response: Response,
    @AuthenticatedUser() currentUser: UserEntity,
    @Body() createShortenedUrlDto: CreateShortenedUrlDto
  ) {
    try {
      createShortenedUrlDto.userId = currentUser?.id;
      await this.shortenedUrlService.createShortenedUrl(createShortenedUrlDto);
      return response.status(HttpStatus.CREATED).send();
    } catch (err) {
      return handleError(response, err);
    }
  }
  @Get(":shortUrl")
  @IsPublic()
  async redirectAndUpdateNumbersAccessUrl(
    @Res() response: Response,
    @Param("shortenedUrlId") shortenedUrlId: string
  ) {
    try {
      const updateNumberAccessUrl =
        await this.shortenedUrlService.updateNumberAccessUrl(shortenedUrlId);
      return response.redirect(updateNumberAccessUrl.originalUrl);
    } catch (err) {
      return handleError(response, err);
    }
  }
  @Get()
  async findAllShortenedUrlByUser(
    @Res() response: Response,
    @AuthenticatedUser() currentUser: UserEntity
  ) {
    try {
      const data = await this.shortenedUrlService.findAllShortenedUrlByUser(
        currentUser.id
      );
      return response.status(HttpStatus.OK).json(data);
    } catch (err) {
      return handleError(response, err);
    }
  }

  @Get("/find/:shortenedUrlId")
  async findOneShortenedUrlByUser(
    @Res() response: Response,
    @AuthenticatedUser() currentUser: UserEntity,
    @Param("shortenedUrlId") shortenedUrlId: string
  ) {
    try {
      const data = await this.shortenedUrlService.findOneShortenedUrlByUser(
        currentUser.id,
        shortenedUrlId
      );

      return response.status(HttpStatus.OK).json(data);
    } catch (err) {
      return handleError(response, err);
    }
  }

  @Patch(":shortenedUrlId")
  async updateShortenedUrlByUser(
    @Res() response: Response,
    @AuthenticatedUser() currentUser: UserEntity,
    @Param("shortenedUrlId") shortenedUrlId: string,
    @Body() updateShortenedUrlDto: UpdateShortenedUrlDto
  ) {
    try {
      updateShortenedUrlDto.idShortenedUrl = shortenedUrlId;
      const data = await this.shortenedUrlService.updateShortenedUrlByUser(
        currentUser.id,
        updateShortenedUrlDto
      );

      return response.status(HttpStatus.OK).json(data);
    } catch (err) {
      return handleError(response, err);
    }
  }

  @Delete(":shortenedUrlId")
  async removeShortenedUrlByUser(
    @Res() response: Response,
    @AuthenticatedUser() currentUser: UserEntity,
    @Param("shortenedUrlId") shortenedUrlId: string
  ) {
    try {
      const data = await this.shortenedUrlService.removeShortenedUrlByUser(
        currentUser.id,
        shortenedUrlId
      );

      return response.status(HttpStatus.OK).json();
    } catch (err) {
      return handleError(response, err);
    }
  }
}
