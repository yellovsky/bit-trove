// global modules
import * as bcrypt from 'bcrypt';
import { Effect } from 'effect';

// local modules
import type { DB } from '../db.types';
import { accounts, casbinRules } from '../schema';

type NewAccount = typeof accounts.$inferInsert & {
  roles: string[];
};

export const adminAccount: NewAccount = {
  email: 'admin@email.com',
  pwd_hash: bcrypt.hashSync('admin', 10),
  roles: ['admin', 'member'],
} as const;

export const memberAccount: NewAccount = {
  email: 'member@email.com',
  pwd_hash: bcrypt.hashSync('member', 10),
  roles: ['member'],
} as const;

const seedAccount = (tx: DB, data: NewAccount): Effect.Effect<void, Error> =>
  Effect.gen(function* () {
    const account = yield* Effect.tryPromise(() =>
      tx
        .insert(accounts)
        .values({ email: data.email, pwd_hash: data.pwd_hash })
        .returning({ id: accounts.id }),
    );
    const accountID = account.at(0)?.id;
    if (!accountID)
      return yield* Effect.fail(new Error('Can not seed account'));

    yield* Effect.tryPromise(() =>
      tx
        .insert(casbinRules)
        .values(
          data.roles.map((role) => ({ ptype: 'g', v0: accountID, v1: role })),
        ),
    );
  });

export const seedAccounts = (tx: DB): Effect.Effect<void, Error> =>
  Effect.all(
    [adminAccount, memberAccount].map((account) => seedAccount(tx, account)),
  );
