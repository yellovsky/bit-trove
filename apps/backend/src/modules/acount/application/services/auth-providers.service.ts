import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { EmailAuthProviderModel } from '../../domain/models/auth-provider.model';
import { AUTH_PROVIDERS_REPO } from '../../domain/repositories/auth-providers.repository.interface';
import type { AuthProvidersService, GetAuthProviderByEmailCommand } from './auth-providers.service.interface';

@Injectable()
export class AuthProvidersServiceImpl implements AuthProvidersService {
  constructor(
    @Inject(AUTH_PROVIDERS_REPO)
    private readonly authProvidersRepo: IdentifierOf<typeof AUTH_PROVIDERS_REPO>
  ) {}

  getAuthProviderByEmail(
    txReqCtx: TxRequestContext,
    command: GetAuthProviderByEmailCommand
  ): Effect.Effect<EmailAuthProviderModel, ExclusionReason | UnknownException> {
    return this.authProvidersRepo.findAuthProviderByEmail(txReqCtx, command);
  }
}
