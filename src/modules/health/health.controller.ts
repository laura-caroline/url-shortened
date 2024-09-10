import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  @Get()
  @IsPublic()
  checkHealth(@Res() response: Response) {
    return response.status(HttpStatus.OK).json();
  }
}
