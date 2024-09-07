import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedUrlService } from './shortened-url.service';
import { ShortenedUrlRepository } from './shortened-url.repository';
import { UserService } from '../user/user.service';
import { NotFoundException } from '@nestjs/common';
import { CreateShortenedUrlDto } from './dto/request/create-shortened-url.dto';
import { UpdateShortenedUrlDto } from './dto/request/update-shortened-url.dto';

jest.mock('src/utils/generateRandomLetters', () => ({
  generateRandomLetters: jest.fn().mockReturnValue('abc123'),
}));

describe('ShortenedUrlService', () => {
  let service: ShortenedUrlService;
  let repository: ShortenedUrlRepository;
  let userService: UserService;

  const mockShortenedUrlRepository = {
    createShortenedUrl: jest.fn(),
    listShortenedUrlByUser: jest.fn(),
    findByIdByUser: jest.fn(),
    findByShortUrl: jest.fn(),
    updateNumberAccessUrl: jest.fn(),
    updateUrlOriginByUser: jest.fn(),
    deleteShortenedUrlByUser: jest.fn(),
  };

  const mockUserService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortenedUrlService,
        {
          provide: ShortenedUrlRepository,
          useValue: mockShortenedUrlRepository,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<ShortenedUrlService>(ShortenedUrlService);
    repository = module.get<ShortenedUrlRepository>(ShortenedUrlRepository);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createShortenedUrl', () => {
    it('should create a shortened URL', async () => {
      const createShortenedUrlDto: CreateShortenedUrlDto = {
        originalUrl: 'http://example.com',
        userId: '1',
      };
      mockUserService.findById.mockResolvedValueOnce({ id: '1' });
      mockShortenedUrlRepository.createShortenedUrl.mockResolvedValueOnce({
        shortUrl: 'abc123',
      });

      const result = await service.createShortenedUrl(createShortenedUrlDto);
      expect(userService.findById).toHaveBeenCalledWith('1');
      expect(repository.createShortenedUrl).toHaveBeenCalledWith({
        ...createShortenedUrlDto,
        shortUrl: 'abc123',
      });
      expect(result).toEqual({ shortUrl: 'abc123' });
    });

    it('should throw NotFoundException if user is not found', async () => {
      const createShortenedUrlDto: CreateShortenedUrlDto = {
        originalUrl: 'http://example.com',
        userId: '1',
      };
      mockUserService.findById.mockResolvedValueOnce(null);

      await expect(
        service.createShortenedUrl(createShortenedUrlDto)
      ).rejects.toThrow(NotFoundException);
      expect(userService.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('findAllShortenedUrlByUser', () => {
    it('should return all shortened URLs for a user', async () => {
      mockShortenedUrlRepository.listShortenedUrlByUser.mockResolvedValueOnce([
        { shortUrl: 'abc123' },
      ]);

      const result = await service.findAllShortenedUrlByUser('1');
      expect(repository.listShortenedUrlByUser).toHaveBeenCalledWith('1');
      expect(result).toEqual([{ shortUrl: 'abc123' }]);
    });
  });

  describe('findOneShortenedUrlByUser', () => {
    it('should return a shortened URL for a user', async () => {
      mockShortenedUrlRepository.findByIdByUser.mockResolvedValueOnce({
        shortUrl: 'abc123',
      });

      const result = await service.findOneShortenedUrlByUser('1', 'abc123');
      expect(repository.findByIdByUser).toHaveBeenCalledWith('1', 'abc123');
      expect(result).toEqual({ shortUrl: 'abc123' });
    });
  });

  describe('updateNumberAccessUrl', () => {
    it('should update access count for a shortened URL', async () => {
      const mockUrl = {
        shortUrl: 'abc123',
        countAccessUrl: 0,
        id: '1',
        idShortenedUrl: '1',
      };
      mockShortenedUrlRepository.findByShortUrl.mockResolvedValueOnce(mockUrl);

      await service.updateNumberAccessUrl('abc123');
      expect(repository.findByShortUrl).toHaveBeenCalledWith('abc123');
      expect(repository.updateNumberAccessUrl).toHaveBeenCalledWith(null, {
        ...mockUrl,
        countAccessUrl: 1,
      });
    });

    it('should throw NotFoundException if URL is not found', async () => {
      mockShortenedUrlRepository.findByShortUrl.mockResolvedValueOnce(null);

      await expect(service.updateNumberAccessUrl('abc123')).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('updateUrlOriginByUser', () => {
    it('should update the original URL', async () => {
      const updateShortenedUrlDto: UpdateShortenedUrlDto = {
        idShortenedUrl: 'abc123',
        originalUrl: 'http://new-url.com',
      };
      mockShortenedUrlRepository.findByIdByUser.mockResolvedValueOnce({
        shortUrl: 'abc123',
      });

      await service.updateUrlOriginByUser('1', updateShortenedUrlDto);
      expect(repository.findByIdByUser).toHaveBeenCalledWith('1', 'abc123');
      expect(repository.updateUrlOriginByUser).toHaveBeenCalledWith('1', {
        idShortenedUrl: 'abc123',
        originalUrl: 'http://new-url.com',
      });
    });

    it('should throw NotFoundException if URL is not found', async () => {
      const updateShortenedUrlDto: UpdateShortenedUrlDto = {
        idShortenedUrl: 'abc123',
        originalUrl: 'http://new-url.com',
      };
      mockShortenedUrlRepository.findByIdByUser.mockResolvedValueOnce(null);

      await expect(
        service.updateUrlOriginByUser('1', updateShortenedUrlDto)
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeShortenedUrlByUser', () => {
    it('should remove a shortened URL', async () => {
      mockShortenedUrlRepository.findByIdByUser.mockResolvedValueOnce({
        shortUrl: 'abc123',
      });

      await service.removeShortenedUrlByUser('1', 'abc123');
      expect(repository.findByIdByUser).toHaveBeenCalledWith('1', 'abc123');
      expect(repository.deleteShortenedUrlByUser).toHaveBeenCalledWith(
        '1',
        'abc123'
      );
    });

    it('should throw NotFoundException if URL is not found', async () => {
      mockShortenedUrlRepository.findByIdByUser.mockResolvedValueOnce(null);

      await expect(
        service.removeShortenedUrlByUser('1', 'abc123')
      ).rejects.toThrow(NotFoundException);
    });
  });
});
