import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { hashData } from 'src/utils/hash';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';

jest.mock('src/utils/hash', () => ({
  hashData: jest.fn().mockResolvedValue('hashed_refresh_token'),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let authRepository: AuthRepository;
  let userService: UserService;
  let jwtService: JwtService;

  const mockAuthRepository = {
    updateRefreshToken: jest.fn(),
    findUserByRefreshToken: jest.fn(),
  };

  const mockUserService = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('signed_token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: mockAuthRepository,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authRepository = module.get<AuthRepository>(AuthRepository);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('updateRefreshToken', () => {
    it('should update the refresh token and return the hashed token', async () => {
      const userId = '1';
      const refreshToken = 'refresh_token';

      const result = await authService.updateRefreshToken(userId, refreshToken);

      expect(hashData).toHaveBeenCalledWith(refreshToken);
      expect(authRepository.updateRefreshToken).toHaveBeenCalledWith(
        userId,
        'hashed_refresh_token'
      );
      expect(result).toEqual('hashed_refresh_token');
    });
  });

  describe('refresh', () => {
    it('should refresh tokens and return them', async () => {
      const refreshToken = 'refresh_token';
      const mockUser: UserEntity = {
        id: '1',
        email: 'test@example.com',
      } as UserEntity;

      mockAuthRepository.findUserByRefreshToken.mockResolvedValueOnce(mockUser);
      jest.spyOn(authService, 'getTokens').mockResolvedValueOnce({
        accessToken: 'new_access_token',
        refreshToken: 'new_refresh_token',
      });

      const result = await authService.refresh(refreshToken);

      expect(authRepository.findUserByRefreshToken).toHaveBeenCalledWith(
        refreshToken
      );
      expect(authService.getTokens).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({
        accessToken: 'new_access_token',
        refreshToken: 'hashed_refresh_token',
      });
    });

    it('should throw NotFoundException if the user is not found', async () => {
      const refreshToken = 'invalid_refresh_token';

      mockAuthRepository.findUserByRefreshToken.mockResolvedValueOnce(null);

      await expect(authService.refresh(refreshToken)).rejects.toThrow(
        NotFoundException
      );
      expect(authRepository.findUserByRefreshToken).toHaveBeenCalledWith(
        refreshToken
      );
    });
  });

  describe('getTokens', () => {
    it('should generate access and refresh tokens', async () => {
      const mockUser: UserEntity = {
        id: '1',
        email: 'test@example.com',
      } as UserEntity;

      const result = await authService.getTokens(mockUser);

      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        accessToken: 'signed_token',
        refreshToken: 'signed_token',
      });
    });
  });

  describe('login', () => {
    it('should log in the user and return tokens', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser: UserEntity = {
        id: '1',
        email: 'test@example.com',
      } as UserEntity;

      mockUserService.findByEmail.mockResolvedValueOnce(mockUser);
      jest.spyOn(authService, 'getTokens').mockResolvedValueOnce({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      });

      const result = await authService.login(loginDto);

      expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(authService.getTokens).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({
        accessToken: 'access_token',
        refreshToken: 'hashed_refresh_token',
      });
    });

    it('should log an error and rethrow it if login fails', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      mockUserService.findByEmail.mockRejectedValueOnce(
        new Error('Login failed')
      );

      await expect(authService.login(loginDto)).rejects.toThrow('Login failed');
      expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
    });
  });

  describe('validateUser', () => {
    it('should return user data without password if valid credentials are provided', async () => {
      const mockUser: UserEntity = {
        id: '1',
        email: 'test@example.com',
        password: 'hashed_password',
      } as UserEntity;

      mockUserService.findByEmail.mockResolvedValueOnce(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      const result = await authService.validateUser(
        'test@example.com',
        'password123'
      );

      expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashed_password'
      );
      expect(result).toEqual({ id: '1', email: 'test@example.com' });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      mockUserService.findByEmail.mockResolvedValueOnce(null);

      await expect(
        authService.validateUser('test@example.com', 'password123')
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const mockUser: UserEntity = {
        id: '1',
        email: 'test@example.com',
        password: 'hashed_password',
      } as UserEntity;

      mockUserService.findByEmail.mockResolvedValueOnce(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      await expect(
        authService.validateUser('test@example.com', 'password123')
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
