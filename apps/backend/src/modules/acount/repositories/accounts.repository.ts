import { Injectable } from '@nestjs/common';
import * as Either from 'effect/Either';

import { NotFoundReason, type ResultOrExcluded } from 'src/shared/excluded';

import type { TransactionContext } from 'src/modules/prisma';

import { AccountEntity } from '../entities/account.entity';
import type { AccountsRepository } from '../interfaces/accounts.repository.interface';
import { type DBAccount, dbAccountSelect } from './accounts.repository.types';

@Injectable()
export class AccountsRepositoryImpl implements AccountsRepository {
  async findAccountById(txCtx: TransactionContext, id: string): Promise<ResultOrExcluded<AccountEntity>> {
    const dbAccount = await txCtx.tx.account.findUnique({
      select: dbAccountSelect,
      where: { id },
    });

    return !dbAccount ? Either.left(new NotFoundReason()) : Either.right(this.#toAccountEntity(dbAccount));
  }

  #toAccountEntity(dbAccount: DBAccount): AccountEntity {
    return AccountEntity.from({
      authProviders: dbAccount.authProviders,
      createdAt: dbAccount.createdAt,
      id: dbAccount.id,
      profiles: dbAccount.profiles,
      updatedAt: dbAccount.updatedAt,
    });
  }
}
