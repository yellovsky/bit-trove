import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import type { PrismaTransactionOrContext, TransactionContext } from '../../prisma.types';

export interface ExtendableTransactionContext extends TransactionContext {
  withTx(tx: PrismaTransactionOrContext): this;
}

export interface TransactionService {
  withTransaction<TContext extends ExtendableTransactionContext, TData, TError = UnknownException>(
    txCtx: TContext,
    work: (txCtx: TContext) => Effect.Effect<TData, TError>
  ): Effect.Effect<TData, TError | UnknownException>;
}

export const TRANSACTION_SRV = 'TRANSACTION_SRV' as InjectableIdentifier<TransactionService>;
