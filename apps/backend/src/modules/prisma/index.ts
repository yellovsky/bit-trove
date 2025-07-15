export { PRISMA_SRV, PrismaService } from './application/services/prisma.service.interface';
export { TRANSACTION_SRV, TransactionService } from './application/services/transaction.service.interface';

export { PrismaModule } from './prisma.module';
export type {
  isPrismaTransaction,
  PrismaTransaction,
  PrismaTransactionOrContext,
  TransactionContext,
} from './prisma.types';
