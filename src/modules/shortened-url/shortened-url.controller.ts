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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('shortenedUrl')
@ApiTags('ShortenedUrl')
export class ShortenedUrlController {
  constructor(private readonly shortenedUrlService: ShortenedUrlService) {}

  @ApiOperation({ summary: 'Criar url encurtada' })
  @Post()
  @IsPublic()
  async createShortenedUrl(
    @Res() response: Response,
    @Body() createShortenedUrlDto: CreateShortenedUrlDto
  ) {
    try {
      const createShortenedUrl =
        await this.shortenedUrlService.createShortenedUrl(
          createShortenedUrlDto
        );
      return response.status(HttpStatus.CREATED).send(createShortenedUrl.id);
    } catch (err) {
      return handleError(response, err);
    }
  }
  @ApiOperation({
    summary: 'Ao visitar a url encurtada, atualizar numero de acesso',
  })
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

  @ApiOperation({
    summary: 'Obter urls encurtadas do usuário autenticado',
  })
  @Get()
  @ApiBearerAuth()
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

  @ApiOperation({
    summary: 'Obter url encurtada do usuário autenticado',
  })
  @Get('/find/:shortenedUrlId')
  @ApiBearerAuth()
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

  @ApiOperation({
    summary: 'Editar origem da url encurtada ',
  })
  @Patch(':shortenedUrlId')
  @ApiBearerAuth()
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

  @ApiOperation({
    summary: 'Remover url encurtada',
  })
  @Delete(':shortenedUrlId')
  @ApiBearerAuth()
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
