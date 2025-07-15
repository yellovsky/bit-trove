import type { PrismaClient } from '@generated/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { isPrismaTransaction } from '../../prisma.types';
import { PRISMA_SRV } from './prisma.service.interface';
import type { ExtendableTransactionContext, TransactionService } from './transaction.service.interface';

@Injectable()
export class TransactionServiceImpl implements TransactionService {
  constructor(@Inject(PRISMA_SRV) private readonly prisma: PrismaClient) {}

  /**
   * Executes work within a transaction context
   * @param work - The work to execute within the transaction
   * @returns Effect wrapping the result of the work
   */
  withTransaction<TContext extends ExtendableTransactionContext, TData, TError = UnknownException>(
    txCtx: TContext,
    work: (txCtx: TContext) => Effect.Effect<TData, TError>
  ): Effect.Effect<TData, TError | UnknownException> {
    if (isPrismaTransaction(txCtx.tx)) return Effect.tryPromise(() => Effect.runPromise(work(txCtx as TContext)));
    return Effect.tryPromise(() =>
      this.prisma.$transaction(async (tx) => {
        const txCtxWithTransaction = txCtx.withTx(tx);
        return Effect.runPromise(work(txCtxWithTransaction));
      })
    );
  }
}
