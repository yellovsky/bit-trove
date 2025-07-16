import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { EmailAuthProviderModel } from '../../domain/models/auth-provider.model';

export interface GetAuthProviderByEmailCommand {
  email: string;
}

export interface AuthProvidersService {
  getAuthProviderByEmail(
    txReqCtx: TxRequestContext,
    command: GetAuthProviderByEmailCommand
  ): Effect.Effect<EmailAuthProviderModel, ExclusionReason | UnknownException>;
}

export const AUTH_PROVIDERS_SRV = 'AUTH_PROVIDERS_SRV' as InjectableIdentifier<AuthProvidersService>;
