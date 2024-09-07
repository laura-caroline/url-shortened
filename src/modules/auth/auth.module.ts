import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AtStrategy } from './strategies/at.strategy';
@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, LocalStrategy, AtStrategy],
  imports: [UserModule, JwtModule, PrismaModule],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}
