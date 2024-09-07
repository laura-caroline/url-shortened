import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { hashData } from 'src/utils/hash';
import { UserCreateDto } from './dto/request/user.create.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

jest.mock('src/utils/hash', () => ({
  hashData: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  const mockUserRepository = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const userCreateDto: UserCreateDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'John Doe',
      };

      mockUserRepository.findByEmail.mockResolvedValueOnce(null);
      mockUserRepository.createUser.mockResolvedValueOnce({
        id: '1',
        ...userCreateDto,
        password: 'hashed_password',
      });

      const result = await service.createUser(userCreateDto);

      expect(repository.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(hashData).toHaveBeenCalledWith('password123');
      expect(repository.createUser).toHaveBeenCalledWith({
        ...userCreateDto,
        password: 'hashed_password',
      });
      expect(result).toEqual({
        id: '1',
        ...userCreateDto,
        password: 'hashed_password',
      });
    });

    it('should throw an error if user with the email already exists', async () => {
      const userCreateDto: UserCreateDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'John Doe',
      };

      // Simula que o repositório retorna um usuário com o mesmo email
      mockUserRepository.findByEmail.mockResolvedValueOnce({
        id: '1',
        ...userCreateDto,
      });

      // Espera que o serviço lance uma ConflictException
      await expect(service.createUser(userCreateDto)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should log an error and throw if there is an issue during creation', async () => {
      const userCreateDto: UserCreateDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'John Doe',
      };

      mockUserRepository.findByEmail.mockResolvedValueOnce(null);
      mockUserRepository.createUser.mockRejectedValueOnce(
        new Error('Database error')
      );

      await expect(service.createUser(userCreateDto)).rejects.toThrow(
        'Database error'
      );
      expect(repository.createUser).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a user by ID', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashed_password',
        name: 'John Doe',
      };

      mockUserRepository.findById.mockResolvedValueOnce(mockUser);

      const result = await service.findById('1');
      expect(repository.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockUser);
    });

    it('should log an error and throw if user not found by ID', async () => {
      mockUserRepository.findById.mockRejectedValueOnce(
        new Error('User not found')
      );

      await expect(service.findById('1')).rejects.toThrow('User not found');
      expect(repository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashed_password',
        name: 'John Doe',
      };

      mockUserRepository.findByEmail.mockResolvedValueOnce(mockUser);

      const result = await service.findByEmail('test@example.com');
      expect(repository.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(result).toEqual(mockUser);
    });

    it('should log an error and throw if user not found by email', async () => {
      mockUserRepository.findByEmail.mockRejectedValueOnce(
        new Error('User not found')
      );

      await expect(service.findByEmail('test@example.com')).rejects.toThrow(
        'User not found'
      );
      expect(repository.findByEmail).toHaveBeenCalledWith('test@example.com');
    });
  });
});
