import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { handleError } from 'src/utils/handlerError';
import { LoginDto } from './dto/request/login.dto';
import { RefreshTokenDto } from './dto/request/updateRefreshToken.dto';
import { UserToken } from '../user/dto/response/userToken.dto';

jest.mock('src/utils/handlerError', () => ({
  handleError: jest.fn(),
}));

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let response: Response;

  const mockAuthService = {
    login: jest.fn(),
    refresh: jest.fn(),
  };

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    response = mockResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should log in a user and return a token', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const loginResponse: UserToken = {
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      };

      mockAuthService.login.mockResolvedValueOnce(loginResponse);

      await controller.login(response, loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith(loginResponse);
    });

    it('should handle errors when login fails', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      mockAuthService.login.mockRejectedValueOnce(new Error('Login failed'));

      await controller.login(response, loginDto);

      expect(handleError).toHaveBeenCalledWith(response, expect.any(Error));
    });
  });

  describe('refreshToken', () => {
    it('should refresh tokens and return a response', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'refresh_token',
      };

      const tokenResponse = {
        accessToken: 'new_access_token',
        refreshToken: 'new_refresh_token',
      };

      mockAuthService.refresh.mockResolvedValueOnce(tokenResponse);

      await controller.refreshToken(refreshTokenDto.refreshToken, response);

      expect(authService.refresh).toHaveBeenCalledWith(
        refreshTokenDto.refreshToken
      );
      expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(response.send).toHaveBeenCalledWith({
        ...tokenResponse,
        message: 'Tokens retornados com sucesso',
      });
    });

    it('should handle errors when refresh token fails', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'invalid_refresh_token',
      };

      mockAuthService.refresh.mockRejectedValueOnce(new Error('Invalid token'));

      await controller.refreshToken(refreshTokenDto.refreshToken, response);

      expect(handleError).toHaveBeenCalledWith(response, expect.any(Error));
    });
  });
});
