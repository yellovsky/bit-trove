import { Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { type ExclusionReason, NotFoundReason } from 'src/shared/excluded';

import type { TransactionContext } from 'src/modules/prisma';

import type { AccountModel } from '../../domain/models/account.model';
import type { AccountsRepository } from '../../domain/repositories/accounts.repository.interface';
import { dbAccountSelect } from './accounts.repository.types';
import { mapToAccountModel } from './model-mappers';

@Injectable()
export class AccountsRepositoryImpl implements AccountsRepository {
  findAccountById(
    txCtx: TransactionContext,
    id: string
  ): Effect.Effect<AccountModel, ExclusionReason | UnknownException> {
    return Effect.tryPromise(() =>
      txCtx.tx.account.findUnique({
        select: dbAccountSelect,
        where: { id },
      })
    ).pipe(
      Effect.flatMap((dbProfile) =>
        !dbProfile ? Effect.fail(new NotFoundReason()) : Effect.succeed(mapToAccountModel(dbProfile))
      )
    );
  }
}
