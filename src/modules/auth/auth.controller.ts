import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Response } from 'express';

import { UserToken } from '../user/dto/response/userToken.dto';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LoginDto } from './dto/request/login.dto';
import { RefreshTokenDto } from './dto/request/updateRefreshToken.dto';
import { LocalAuthGuard } from './guards';
import { handleError } from 'src/utils/handlerError';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Efetuar login' })
  @Post('login')
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserToken,
  })
  async login(@Res() response: Response, @Body() dto: LoginDto) {
    try {
      const loginResponse = await this.authService.login(dto);
      return response.status(HttpStatus.OK).json(loginResponse);
    } catch (err) {
      return handleError(response, err);
    }
  }

  @ApiOperation({ summary: 'Atualizar refresh token' })
  @IsPublic()
  @ApiBody({ type: RefreshTokenDto })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
    @Res() response: Response
  ) {
    try {
      const tokens = await this.authService.refresh(refreshToken);
      return response.status(HttpStatus.CREATED).send({
        ...tokens,
        message: 'Tokens retornados com sucesso',
      });
    } catch (err) {
      return handleError(response, err);
    }
  }
}
