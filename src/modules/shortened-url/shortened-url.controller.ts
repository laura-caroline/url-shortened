import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { handleError } from 'src/utils/handlerError';
import { AuthenticatedUser } from '../auth/decorators/current-user.decorator';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { CreateShortenedUrlDto } from './dto/request/create-shortened-url.dto';
import { UpdateShortenedUrlDto } from './dto/request/update-shortened-url.dto';
import { ShortenedUrlService } from './shortened-url.service';

@Controller('shortenedUrl')
export class ShortenedUrlController {
  constructor(private readonly shortenedUrlService: ShortenedUrlService) {}

  @Post()
  @IsPublic()
  async createShortenedUrl(
    @Res() response: Response,
    @Body() createShortenedUrlDto: CreateShortenedUrlDto
  ) {
    try {
      await this.shortenedUrlService.createShortenedUrl(createShortenedUrlDto);
      return response.status(HttpStatus.CREATED).send();
    } catch (err) {
      return handleError(response, err);
    }
  }
  @Get(':shortUrl')
  @IsPublic()
  async redirectAndUpdateNumbersAccessUrl(
    @Res() response: Response,
    @Param('shortUrl') shortUrl: string
  ) {
    try {
      await this.shortenedUrlService.updateNumberAccessUrl(shortUrl);
      return response.status(200).send();
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

  @Get('/find/:shortenedUrlId')
  async findOneShortenedUrlByUser(
    @Res() response: Response,
    @AuthenticatedUser() currentUser: UserEntity,
    @Param('shortenedUrlId') shortenedUrlId: string
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

  @Patch(':shortenedUrlId')
  async updateUrlOriginByUser(
    @Res() response: Response,
    @AuthenticatedUser() currentUser: UserEntity,
    @Param('shortenedUrlId') shortenedUrlId: string,
    @Body() updateShortenedUrlDto: UpdateShortenedUrlDto
  ) {
    try {
      updateShortenedUrlDto.idShortenedUrl = shortenedUrlId;
      const data = await this.shortenedUrlService.updateUrlOriginByUser(
        currentUser.id,
        updateShortenedUrlDto
      );

      return response.status(HttpStatus.OK).json(data);
    } catch (err) {
      return handleError(response, err);
    }
  }

  @Delete(':shortenedUrlId')
  async removeShortenedUrlByUser(
    @Res() response: Response,
    @AuthenticatedUser() currentUser: UserEntity,
    @Param('shortenedUrlId') shortenedUrlId: string
  ) {
    try {
      await this.shortenedUrlService.removeShortenedUrlByUser(
        currentUser.id,
        shortenedUrlId
      );

      return response.status(HttpStatus.OK).json();
    } catch (err) {
      return handleError(response, err);
    }
  }
}
