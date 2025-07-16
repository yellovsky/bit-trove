import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import type { TransactionContext } from 'src/modules/prisma';

import type { AccountModel } from '../models/account.model';

export interface AccountsRepository {
  findAccountById(
    txCtx: TransactionContext,
    id: string
  ): Effect.Effect<AccountModel, ExclusionReason | UnknownException>;
}

export const ACCOUNTS_REPO = 'ACCOUNTS_REPO' as InjectableIdentifier<AccountsRepository>;
