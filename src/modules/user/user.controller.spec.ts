import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/request/user.create.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { handleError } from 'src/utils/handlerError';

jest.mock('src/utils/handlerError', () => ({
  handleError: jest.fn(),
}));

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let response: Response;

  const mockUserService = {
    createUser: jest.fn(),
  };

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    response = mockResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createAsync', () => {
    it('should create a user and return status 201', async () => {
      const userCreateDto: UserCreateDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'John Doe',
      };

      await controller.createAsync(response, userCreateDto);
      expect(userService.createUser).toHaveBeenCalledWith(userCreateDto);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(response.send).toHaveBeenCalled();
    });

    it('should handle errors if user creation fails', async () => {
      const userCreateDto: UserCreateDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'John Doe',
      };

      // Simula um erro ao chamar o método createUser
      jest
        .spyOn(userService, 'createUser')
        .mockRejectedValueOnce(new Error('Error'));

      await controller.createAsync(response, userCreateDto);

      // Verifica se handleError foi chamado com o erro correto
      expect(handleError).toHaveBeenCalledWith(response, expect.any(Error));
    });
  });
});
