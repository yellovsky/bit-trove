// global modules
import { Effect } from 'effect';
import type { LoginWithEmailFP } from '@repo/api-models';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { AppConfigService } from 'src/modules/app-config';
import type { RequestContext } from 'src/types/context';

import {
  type ApiError,
  toApiError,
  UnauthorizedAPIError,
} from 'src/exceptions';

// local modules
import { AccountRepository } from '../repositories/account.repository';
import type { DBAccount } from '../repositories/account.db-models';

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private readonly appConfigSrv: AppConfigService,

    @Inject()
    private readonly accountRepo: AccountRepository,
  ) {}

  validateAccountByEmail(
    reqCtx: RequestContext,
    params: LoginWithEmailFP,
  ): Effect.Effect<DBAccount, ApiError> {
    return Effect.gen(this, function* () {
      const account = yield* this.accountRepo.findUnique(reqCtx, {
        email: params.email,
      });

      if (!account) return yield* new UnauthorizedAPIError({});

      if (params.password !== this.appConfigSrv.adminPassword) {
        return yield* new UnauthorizedAPIError({});
      }
      return account;
    }).pipe(Effect.mapError(toApiError));
  }
}
