import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  refreshToken: string;
  updatedAt: Date;
  deletedAt: Date;
}
