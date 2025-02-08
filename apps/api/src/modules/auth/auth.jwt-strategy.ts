// global modules
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { DBUser } from 'src/db-models/user';
import type { JWTTokenPayload } from 'src/modules/oauth';
import { APP_CONFIG_SRV, type AppConfigService } from 'src/modules/app-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(APP_CONFIG_SRV)
    readonly appConfigSrv: AppConfigService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfigSrv.jwtSecret,
    });
  }

  async validate(payload: JWTTokenPayload): Promise<DBUser> {
    return { email: payload.email };
  }
}
