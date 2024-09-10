import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

describe('HealthController', () => {
  let healthController: HealthController;

  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    healthController = module.get<HealthController>(HealthController);
  });

  it('should return status OK', async () => {
    const res = mockResponse() as Response;

    await healthController.checkHealth(res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalled();
  });
});
