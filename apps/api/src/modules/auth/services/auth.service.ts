// global modules
import * as R from 'ramda';
import { Effect } from 'effect';
import type { LoginWithEmailFP } from '@repo/api-models';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

// common modules
import type { DBAccount } from 'src/modules/account';

// local modules
import { AccountRepository } from '../repositories/account.repository';
import { BcryptService } from './bcrypt.service';
import type { JWTTokenPayload } from './access-token.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private readonly accountRepo: AccountRepository,

    @Inject()
    private readonly bcryptSrv: BcryptService,
  ) {}

  validateAccountByEmail(
    params: LoginWithEmailFP,
  ): Effect.Effect<DBAccount, Error> {
    return Effect.gen(this, function* () {
      const account = yield* this.accountRepo.findByEmailWithPWDHash(
        null,
        params.email,
      );
      if (!account) return yield* Effect.fail(new UnauthorizedException());

      const pwdValid = yield* this.bcryptSrv.compare(
        params.password,
        account.pwd_hash,
      );

      return !pwdValid
        ? yield* Effect.fail(new UnauthorizedException())
        : R.omit(['pwd_hash'], account);
    });
  }

  validateAccountByJWTTokenPayload(
    payload: JWTTokenPayload,
  ): Effect.Effect<DBAccount, Error> {
    return Effect.gen(this, function* () {
      const account = yield* this.accountRepo.findByEmail(null, payload.email);
      if (!account) return yield* Effect.fail(new UnauthorizedException());
      return account;
    });
  }
}
