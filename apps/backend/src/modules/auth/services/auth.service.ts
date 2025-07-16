import { Inject, Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';
import * as Either from 'effect/Either';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import { ACCOUNTS_SRV, AUTH_PROVIDERS_SRV, PROFILES_SRV, type ProfileModel } from 'src/modules/acount';

import { AuthInvalidPwdError } from '../errors/auth-invalid-pwd.error';
import { AuthNotFoundError } from '../errors/auth-not-found.error';
import { AuthPwdIsNotSetError } from '../errors/auth-pwd-is-not-set.error';
import type { AuthService } from '../interfaces/auth.service.interface';
import { BCRYPT_SRV } from '../interfaces/bcrypt.service.interface';
import type { JWTTokenPayload } from '../interfaces/jwt-token';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(ACCOUNTS_SRV)
    private readonly accountSrv: IdentifierOf<typeof ACCOUNTS_SRV>,

    @Inject(PROFILES_SRV)
    private readonly profilesSrv: IdentifierOf<typeof PROFILES_SRV>,

    @Inject(AUTH_PROVIDERS_SRV)
    private readonly authProvidersSrv: IdentifierOf<typeof AUTH_PROVIDERS_SRV>,

    @Inject(BCRYPT_SRV)
    private readonly bcryptSrv: IdentifierOf<typeof BCRYPT_SRV>
  ) {}

  validateProfileByEmail(
    txReqCtx: TxRequestContext,
    email: string,
    password: string
  ): Effect.Effect<ProfileModel, ExclusionReason | UnknownException> {
    return Effect.gen(this, function* () {
      const emailAuthProvider = yield* Effect.either(this.authProvidersSrv.getAuthProviderByEmail(txReqCtx, { email }));
      if (Either.isLeft(emailAuthProvider)) throw new AuthNotFoundError();

      const passwordHash = emailAuthProvider.right.getPasswordHash();
      if (!passwordHash) throw new AuthPwdIsNotSetError();

      const pwdValid = yield* Effect.either(this.bcryptSrv.compare(password, passwordHash));
      if (!pwdValid) throw new AuthInvalidPwdError();

      return yield* this.accountSrv.getAccountRootProfile(txReqCtx, { accountId: emailAuthProvider.right.accountId });
    });
  }

  validateProfileByJWTTokenPayload(
    txReqCtx: TxRequestContext,
    payload: JWTTokenPayload
  ): Effect.Effect<ProfileModel, ExclusionReason | UnknownException> {
    return this.profilesSrv.getProfileById(txReqCtx, { id: payload.profileId });
  }
}
