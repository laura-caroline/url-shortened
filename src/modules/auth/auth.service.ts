import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';

import { hashData } from 'src/utils/hash';
import { UserToken } from '../user/dto/response/userToken.dto';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/request/login.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async updateRefreshToken(userId: string, refreshToken: string) {
    const refreshTokenHash = await hashData(refreshToken);
    await this.authRepository.updateRefreshToken(userId, refreshTokenHash);
    return refreshTokenHash;
  }

  async refresh(refreshToken: string) {
    const user = await this.authRepository.findUserByRefreshToken(refreshToken);

    if (!user) {
      throw new NotFoundException(
        `Usuário com o refesh ${this.refresh} não foi encontrado `
      );
    }
    const tokens: UserToken = await this.getTokens(user);
    const refreshUpdated = await this.updateRefreshToken(
      user.id,
      tokens.refreshToken
    );
    tokens.refreshToken = refreshUpdated;
    return tokens;
  }

  async getTokens(user: UserEntity) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    const payload = {
      sub: user.id,
      ...userWithoutPassword,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.AT_SECRET,
        expiresIn: process.env.JWT_ACCESS_LIFETIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.RT_SECRET,
        expiresIn: process.env.JWT_REFRESH_LIFETIME,
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async login(user: LoginDto) {
    try {
      const userByEmail = await this.userService.findByEmail(user.email);

      const tokens: UserToken = await this.getTokens(userByEmail);
      const refreshTokenUpdated = await this.updateRefreshToken(
        userByEmail.id,
        tokens.refreshToken
      );

      tokens.refreshToken = refreshTokenUpdated;
      return tokens;
    } catch (error) {
      this.logger.error(`Error ao efetuar o login ${error.message}`);
      throw error;
    }
  }

  async validateUser(email: string, passwordInput: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('E-mail e/ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(passwordInput, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail e/ou senha inválidos');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
