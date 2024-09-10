import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Response } from 'express';

import { handleError } from 'src/utils/handlerError';
import { UserToken } from '../user/dto/response/userToken.dto';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthenticatedUser } from './decorators/current-user.decorator';
import { IsPublic } from './decorators/is-public.decorator';
import { LoginDto } from './dto/request/login.dto';
import { RefreshTokenDto } from './dto/request/updateRefreshToken.dto';
import { AtGuard, LocalAuthGuard } from './guards';

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

  @ApiOperation({ summary: 'Current user information' })
  @UseGuards(AtGuard)
  @ApiResponse({ status: HttpStatus.OK })
  @Get('me')
  @ApiBearerAuth()
  async getMe(
    @AuthenticatedUser() currentUser: UserEntity,
    @Res() response: Response
  ) {
    const usuarioDB = await this.authService.getMe(currentUser);

    return response.status(HttpStatus.OK).json(usuarioDB);
  }
}
