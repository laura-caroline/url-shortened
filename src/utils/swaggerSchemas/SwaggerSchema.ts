import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import {
  BadRequestResponse,
  ConflictResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
} from './BaseExceptionSchema';

export const ApiExceptionResponse = () =>
  applyDecorators(
    ApiBadRequestResponse({
      type: BadRequestResponse,
      description: 'Bad Request',
    }),
    ApiConflictResponse({ type: ConflictResponse, description: 'Conflict' }),
    ApiNotFoundResponse({ type: NotFoundResponse, description: 'Not Found' }),
    ApiInternalServerErrorResponse({
      type: InternalServerErrorResponse,
      description: 'Internal Server Error',
    })
  );
