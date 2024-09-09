import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { AtGuard } from './modules/auth/guards';
import { ShortenedUrlModule } from './modules/shortened-url/shortened-url.module';
import { UserModule } from './modules/user/user.module';

export const THROTTLER_LIMIT = 10;

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        limit: THROTTLER_LIMIT,
        ttl: 30000,
      },
    ]),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    UserModule,
    AuthModule,
    ShortenedUrlModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {}
