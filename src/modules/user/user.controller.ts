import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiExceptionResponse } from 'src/utils/swaggerSchemas/SwaggerSchema';

import { UserService } from './user.service';
import { UserCreateDto } from './dto/request/user.create.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { handleError } from 'src/utils/handlerError';

@Controller('user')
@ApiTags('User')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(protected readonly userService: UserService) {}

  @ApiOperation({ summary: 'Criar usuário' })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBody({ type: UserCreateDto })
  @ApiExceptionResponse()
  @Post()
  @IsPublic()
  async createAsync(@Res() response: Response, @Body() dto: UserCreateDto) {
    try {
      await this.userService.createUser(dto);
      return response.status(HttpStatus.CREATED).send();
    } catch (err) {
      return handleError(response, err);
    }
  }
}
