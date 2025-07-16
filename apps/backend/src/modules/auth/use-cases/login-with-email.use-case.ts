import { Inject, Injectable } from '@nestjs/common';
import { addDays } from 'date-fns';
import { Effect } from 'effect';
import type { Request, Response } from 'express';

import type { LoginWithEmailBody } from '@repo/api-models';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { ACCOUNTS_SRV, AUTH_PROVIDERS_SRV } from 'src/modules/acount';
import { PRISMA_SRV, TRANSACTION_SRV } from 'src/modules/prisma';

import { ACCESS_TOKEN_COOKIE_KEY } from '../config/constants';
import { LoginWithEmailResponseDto } from '../dto/login-with-email-response.dto';
import { ACCESS_TOKEN_SRV } from '../interfaces/access-token.service.interface';

@Injectable()
export class LoginWithEmailUseCase {
  constructor(
    @Inject(ACCESS_TOKEN_SRV)
    private readonly accessTokenSrv: IdentifierOf<typeof ACCESS_TOKEN_SRV>,

    @Inject(ACCOUNTS_SRV)
    private readonly accountSrv: IdentifierOf<typeof ACCOUNTS_SRV>,

    @Inject(AUTH_PROVIDERS_SRV)
    private readonly authProviderSrv: IdentifierOf<typeof AUTH_PROVIDERS_SRV>,

    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>,

    @Inject(TRANSACTION_SRV)
    private readonly transactionSrv: IdentifierOf<typeof TRANSACTION_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    body: LoginWithEmailBody,
    req: Request,
    res: Response
  ): Effect.Effect<LoginWithEmailResponseDto, Error> {
    return this.transactionSrv.withTransaction(reqCtx.withTx(this.prismaSrv), (txXtx) =>
      Effect.gen(this, function* () {
        const authProvider = yield* this.authProviderSrv
          .getAuthProviderByEmail(txXtx.withTx(this.prismaSrv), { email: body.email })
          .pipe(Effect.mapError(() => new Error(`Auth provider with ${body.email} email not found`)));

        const account = yield* this.accountSrv
          .getAccountById(txXtx.withTx(this.prismaSrv), { accountId: authProvider.accountId })
          .pipe(Effect.mapError(() => new Error(`Account with ${body.email} email not found`)));

        const profileId = account.profiles.at(0)?.id;
        if (!profileId) return yield* Effect.fail(new Error(`Account with ${body.email} has no profiles`));

        const accessToken = yield* this.accessTokenSrv.generate({ accountId: authProvider.accountId, profileId });
        const domain = this.#getCookieDomain(req);

        if (domain) {
          res.cookie(ACCESS_TOKEN_COOKIE_KEY, accessToken, {
            domain,
            expires: addDays(Date.now(), 7),
            httpOnly: true,
            sameSite: 'lax',
          });
        }

        return new LoginWithEmailResponseDto();
      })
    );
  }

  #getCookieDomain(req: Request): string | null {
    const url = req.headers.origin ? new URL(req.headers.origin) : null;
    return url?.hostname || null;
  }
}
