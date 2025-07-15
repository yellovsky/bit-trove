import type { PrismaClient } from '@generated/prisma';
import type { ITXClientDenyList } from '@generated/prisma/runtime/library';

export type PrismaTransaction = Omit<PrismaClient, ITXClientDenyList>;
export type PrismaTransactionOrContext = PrismaTransaction | PrismaClient;
export const isPrismaTransaction = (tx: PrismaTransactionOrContext): tx is PrismaTransaction => !('$transaction' in tx);

export interface TransactionContext {
  tx: PrismaTransactionOrContext;
}
