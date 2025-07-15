import type { ResultOrExcluded } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import type { TransactionContext } from 'src/modules/prisma';

import type { AccountEntity } from '../entities/account.entity';

export interface AccountsRepository {
  findAccountById(txCtx: TransactionContext, id: string): Promise<ResultOrExcluded<AccountEntity>>;
}

export const ACCOUNTS_REPO = 'ACCOUNTS_REPO' as InjectableIdentifier<AccountsRepository>;
