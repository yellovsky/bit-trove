import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import type { TransactionContext } from 'src/modules/prisma';

import type { EmailAuthProviderModel } from '../models/auth-provider.model';

export interface FindAuthProviderByEmailQuery {
  email: string;
}

export interface AuthProvidersRepository {
  findAuthProviderByEmail(
    txCtx: TransactionContext,
    query: FindAuthProviderByEmailQuery
  ): Effect.Effect<EmailAuthProviderModel, ExclusionReason | UnknownException>;
}

export const AUTH_PROVIDERS_REPO = 'AUTH_PROVIDERS_REPO' as InjectableIdentifier<AuthProvidersRepository>;
