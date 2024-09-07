import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/modules/user/entities/user.entity';

/**
 * Passport strategy for JWT-based authentication.
 *
 * @extends {PassportStrategy(Strategy, 'jwt')}
 *
 * @description
 * This strategy is used for JWT authentication. It extracts the JWT token from the
 * authorization header and validates it. The strategy requires a secret key to verify
 * the token's signature.
 */
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: UserEntity) {
    return {
      id: payload?.id,
      email: payload?.email,
      name: payload?.name,
    };
  }
}
