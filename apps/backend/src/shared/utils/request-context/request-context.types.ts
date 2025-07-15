import type { PrismaTransactionOrContext, TransactionContext } from 'src/modules/prisma';

type LocalizationRequestContext = {
  locale: string;
};

export type AuthRequestContext = {
  accountId: string | null;
  profileId: string | null;
  isAuthorized(): this is { accountId: string; profileId: string };
};

export type BaseRequestContext = LocalizationRequestContext &
  AuthRequestContext & {
    withTx(tx: PrismaTransactionOrContext): TxRequestContext;
  };

export type TxRequestContext = BaseRequestContext & TransactionContext;

export type RequestContext = BaseRequestContext;
