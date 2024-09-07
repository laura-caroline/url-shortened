import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedUrlController } from './shortened-url.controller';
import { ShortenedUrlService } from './shortened-url.service';
import { Response } from 'express';
import { UserEntity } from '../user/entities/user.entity';
import { handleError } from 'src/utils/handlerError'; // ES6 import para handleError

jest.mock('src/utils/handlerError', () => ({
  handleError: jest.fn(),
}));

describe('ShortenedUrlController', () => {
  let controller: ShortenedUrlController;
  let service: ShortenedUrlService;
  let response: Response;

  const mockShortenedUrlService = {
    createShortenedUrl: jest.fn(),
    updateNumberAccessUrl: jest.fn(),
    findAllShortenedUrlByUser: jest.fn(),
    findOneShortenedUrlByUser: jest.fn(),
    updateUrlOriginByUser: jest.fn(),
    removeShortenedUrlByUser: jest.fn(),
  };

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenedUrlController],
      providers: [
        {
          provide: ShortenedUrlService,
          useValue: mockShortenedUrlService,
        },
      ],
    }).compile();

    controller = module.get<ShortenedUrlController>(ShortenedUrlController);
    service = module.get<ShortenedUrlService>(ShortenedUrlService);
    response = mockResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createShortenedUrl', () => {
    it('should create a shortened URL and return status 201', async () => {
      await controller.createShortenedUrl(response, {
        originalUrl: 'http://example.com',
      });
      expect(service.createShortenedUrl).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(201);
    });

    it('should handle errors on createShortenedUrl', async () => {
      jest
        .spyOn(service, 'createShortenedUrl')
        .mockRejectedValueOnce(new Error('Error'));

      await controller.createShortenedUrl(response, {
        originalUrl: 'http://example.com',
      });
      expect(handleError).toHaveBeenCalled(); // Testa se handleError foi chamado
    });
  });

  describe('redirectAndUpdateNumbersAccessUrl', () => {
    it('should update number access URL and return status 200', async () => {
      await controller.redirectAndUpdateNumbersAccessUrl(response, 'shortUrl');
      expect(service.updateNumberAccessUrl).toHaveBeenCalledWith('shortUrl');
      expect(response.status).toHaveBeenCalledWith(200);
    });

    it('should handle errors on redirectAndUpdateNumbersAccessUrl', async () => {
      jest
        .spyOn(service, 'updateNumberAccessUrl')
        .mockRejectedValueOnce(new Error('Error'));

      await controller.redirectAndUpdateNumbersAccessUrl(response, 'shortUrl');
      expect(handleError).toHaveBeenCalled();
    });
  });

  describe('findAllShortenedUrlByUser', () => {
    it('should return all shortened URLs for a user', async () => {
      const mockUser: UserEntity = { id: '1' } as UserEntity;
      await controller.findAllShortenedUrlByUser(response, mockUser);
      expect(service.findAllShortenedUrlByUser).toHaveBeenCalledWith(
        mockUser.id
      );
      expect(response.status).toHaveBeenCalledWith(200);
    });

    it('should handle errors on findAllShortenedUrlByUser', async () => {
      jest
        .spyOn(service, 'findAllShortenedUrlByUser')
        .mockRejectedValueOnce(new Error('Error'));

      await controller.findAllShortenedUrlByUser(response, {
        id: '1',
      } as UserEntity);
      expect(handleError).toHaveBeenCalled();
    });
  });

  describe('updateUrlOriginByUser', () => {
    it('should update the shortened URL and return status 200', async () => {
      const mockUser: UserEntity = { id: '1' } as UserEntity;
      const updateShortenedUrlDto = {
        idShortenedUrl: '1',
        urlOrigin: 'newUrl',
      };

      await controller.updateUrlOriginByUser(
        response,
        mockUser,
        'shortenedUrlId',
        updateShortenedUrlDto
      );
      expect(service.updateUrlOriginByUser).toHaveBeenCalledWith(mockUser.id, {
        idShortenedUrl: 'shortenedUrlId',
        urlOrigin: 'newUrl',
      });
      expect(response.status).toHaveBeenCalledWith(200);
    });

    it('should handle errors on updateUrlOriginByUser', async () => {
      jest
        .spyOn(service, 'updateUrlOriginByUser')
        .mockRejectedValueOnce(new Error('Error'));

      await controller.updateUrlOriginByUser(
        response,
        { id: '1' } as UserEntity,
        'shortenedUrlId',
        { idShortenedUrl: null, originalUrl: 'newUrl' }
      );
      expect(handleError).toHaveBeenCalled();
    });
  });

  describe('removeShortenedUrlByUser', () => {
    it('should delete a shortened URL and return status 200', async () => {
      const mockUser: UserEntity = { id: '1' } as UserEntity;

      await controller.removeShortenedUrlByUser(
        response,
        mockUser,
        'shortenedUrlId'
      );
      expect(service.removeShortenedUrlByUser).toHaveBeenCalledWith(
        mockUser.id,
        'shortenedUrlId'
      );
      expect(response.status).toHaveBeenCalledWith(200);
    });

    it('should handle errors on removeShortenedUrlByUser', async () => {
      jest
        .spyOn(service, 'removeShortenedUrlByUser')
        .mockRejectedValueOnce(new Error('Error'));

      await controller.removeShortenedUrlByUser(
        response,
        { id: '1' } as UserEntity,
        'shortenedUrlId'
      );
      expect(handleError).toHaveBeenCalled();
    });
  });
});
