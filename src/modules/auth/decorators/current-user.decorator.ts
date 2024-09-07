import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { AuthRequest } from "../models/AuthRequest";
import { UserEntity } from "src/modules/user/entities/user.entity";

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    if (request.user && request.user.id) {
      return request.user;
    }
    return null;
  }
);
