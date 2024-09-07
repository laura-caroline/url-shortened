import { UnauthorizedError } from 'src/modules/auth/errors/unauthorized.error';
import { Response } from 'express';
import { HttpStatus, NotFoundException } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (response: Response, error: any) => {
  if (error instanceof UnauthorizedError) {
    return response.status(HttpStatus.UNAUTHORIZED).json({
      error: 'Unauthorized access',
      details: error.message,
    });
  } else if (error instanceof NotFoundException) {
    return response.status(HttpStatus.NOT_FOUND).json({
      error: 'Resource not found',
      details: error.message,
    });
  } else {
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
};
