import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Effect } from 'effect';
import type { Request } from 'express';
import { Strategy } from 'passport-local';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { requestContextFromRequest } from 'src/shared/utils/request-context';

import type { ProfileModel } from 'src/modules/acount';
import { PRISMA_SRV } from 'src/modules/prisma';

import { AUTH_SRV } from '../interfaces/auth.service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_SRV)
    private readonly authSrv: IdentifierOf<typeof AUTH_SRV>,

    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {
    super({ passReqToCallback: true, usernameField: 'email' });
  }

  async validate(request: Request, email: string, password: string): Promise<ProfileModel> {
    const reqCtx = requestContextFromRequest(request);

    const pipeline: Effect.Effect<ProfileModel, Error> = this.authSrv.validateProfileByEmail(
      reqCtx.withTx(this.prismaSrv),
      email,
      password
    );

    return Effect.runPromise(pipeline);
  }
}
