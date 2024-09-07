import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
  ],
  imports: [PrismaModule],
  exports: [UserService, UserRepository],
})
export class UserModule {}
