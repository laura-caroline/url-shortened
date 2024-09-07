import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

import { UserCreateDto } from "./dto/request/user.create.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: UserCreateDto): Promise<UserEntity> {
    return await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email: email?.trim()?.toLowerCase() },
    });

    return user;
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }
}
