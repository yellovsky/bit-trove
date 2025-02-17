// global modules
import { Effect } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { DB } from 'src/db';
import { DRIZZLE_SRV } from 'src/modules/drizzle';
import type { DBAccount, DBAccountWithPWDHash } from 'src/modules/account';

@Injectable()
export class AccountRepository {
  constructor(
    @Inject(DRIZZLE_SRV)
    private readonly db: DB,
  ) {}

  findByEmail(
    db: DB | null,
    email: string,
  ): Effect.Effect<DBAccount | null, Error> {
    return Effect.tryPromise(() =>
      (db || this.db).query.accounts.findFirst({
        columns: { pwd_hash: false },
        where: (accounts, { eq }) => eq(accounts.email, email),
      }),
    ).pipe(Effect.map((val) => val || null));
  }

  findByEmailWithPWDHash(
    db: DB | null,
    email: string,
  ): Effect.Effect<DBAccountWithPWDHash | null, Error> {
    return Effect.tryPromise(() =>
      (db || this.db).query.accounts.findFirst({
        where: (accounts, { eq }) => eq(accounts.email, email),
      }),
    ).pipe(Effect.map((val) => val || null));
  }
}
