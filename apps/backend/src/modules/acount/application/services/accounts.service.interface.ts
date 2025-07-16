import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { AccountModel } from '../../domain/models/account.model';
import type { ProfileModel } from '../../domain/models/profile.model';

export interface GetAccountByIdCommand {
  accountId: string;
}

export interface GetAccountRootProfileCommand {
  accountId: string;
}

export interface AccountsService {
  getAccountById(
    txReqCtx: TxRequestContext,
    command: GetAccountByIdCommand
  ): Effect.Effect<AccountModel, ExclusionReason | UnknownException>;

  getAccountRootProfile(
    txReqCtx: TxRequestContext,
    command: GetAccountRootProfileCommand
  ): Effect.Effect<ProfileModel, ExclusionReason | UnknownException>;
}

export const ACCOUNTS_SRV = 'ACCOUNTS_SRV' as InjectableIdentifier<AccountsService>;
