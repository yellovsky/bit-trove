import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { AccountModel } from '../../domain/models/account.model';
import type { ProfileModel } from '../../domain/models/profile.model';
import { ACCOUNTS_REPO } from '../../domain/repositories/accounts.repository.interface';
import { PROFILES_REPO } from '../../domain/repositories/profiles.repository.interface';
import type {
  AccountsService,
  GetAccountByIdCommand,
  GetAccountRootProfileCommand,
} from './accounts.service.interface';

@Injectable()
export class AccountsServiceImpl implements AccountsService {
  constructor(
    @Inject(ACCOUNTS_REPO)
    private readonly accountsRepo: IdentifierOf<typeof ACCOUNTS_REPO>,

    @Inject(PROFILES_REPO)
    private readonly profilesRepo: IdentifierOf<typeof PROFILES_REPO>
  ) {}

  getAccountById(
    txReqCtx: TxRequestContext,
    command: GetAccountByIdCommand
  ): Effect.Effect<AccountModel, ExclusionReason | UnknownException> {
    return this.accountsRepo.findAccountById(txReqCtx, command.accountId);
  }

  getAccountRootProfile(
    txReqCtx: TxRequestContext,
    command: GetAccountRootProfileCommand
  ): Effect.Effect<ProfileModel, ExclusionReason | UnknownException> {
    return this.profilesRepo.findAccountRootProfile(txReqCtx, command);
  }
}
