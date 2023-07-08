import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(ConfigService)private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_KEY'),
      ignoreExpiration: false,
      algorithm: 'HS384',
    });
  }

  async validate(payload: any) {
    if (payload === null || payload == undefined || payload == '') {
      throw new UnauthorizedException('');
    }
    return { userId: payload.sub, email: payload.email, isVerified: payload.isVerified  };
  }
}