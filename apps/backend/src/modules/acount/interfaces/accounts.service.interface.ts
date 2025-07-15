import type { ResultOrExcluded } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { AccountEntity } from '../entities/account.entity';
import type { ProfileEntity } from '../entities/profile.entity';

export interface AccountsService {
  getAccountById(txReqCtx: TxRequestContext, accountId: string): Promise<ResultOrExcluded<AccountEntity>>;
  getAccountRootProfile(txReqCtx: TxRequestContext, accountId: string): Promise<ResultOrExcluded<ProfileEntity>>;
}

export const ACCOUNTS_SRV = 'ACCOUNTS_SRV' as InjectableIdentifier<AccountsService>;
