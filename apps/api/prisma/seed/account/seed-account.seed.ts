// global modules
import { Effect } from 'effect';
import type { Prisma } from '@prisma/client';

// local modules
import type { PrismaTransaction, Seeder } from '../seed.types';

import { adminAccountDataArgs } from './data/account-data.admin';
import { hashPassword } from './data/account-data.helpers';

const seedAccountData = (
  tx: PrismaTransaction,
  args: Prisma.AccountCreateArgs,
): Effect.Effect<void, Error> =>
  Effect.gen(function* () {
    yield* Effect.logDebug(`Seeding account ${args.data.email}`);
    const withPwdHash = yield* hashPassword(args);
    yield* Effect.tryPromise(() => tx.account.create(withPwdHash));
    yield* Effect.logDebug('seeded');
  });

const argsArray = [adminAccountDataArgs] as const;

export const seedAccounts: Seeder = {
  seed: (tx) =>
    Effect.gen(function* () {
      yield* Effect.logDebug('Start seeding accounts');
      yield* Effect.all(argsArray.map((args) => seedAccountData(tx, args)));
      yield* Effect.logDebug('finish seeding accounts');
    }),

  clear: (tx) =>
    Effect.gen(function* () {
      yield* Effect.logDebug('Start clearing accounts');
      yield* Effect.tryPromise(() =>
        tx.account.deleteMany({
          where: { email: { in: argsArray.map((args) => args.data.email) } },
        }),
      );
      yield* Effect.logDebug('finish clearing accounts');
    }),
};
