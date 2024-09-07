import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
  }

  async findUserByRefreshToken(refreshToken: string): Promise<UserEntity> {
    return await this.prisma.user.findFirst({
      where: {
        deletedAt: null,
        refreshToken: refreshToken,
      },
    });
  }

}
