// global modules
import { Effect } from 'effect';
import { count, eq } from 'drizzle-orm';

import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

// common modules
import type { DB } from 'src/db';
import { DRIZZLE_SRV } from 'src/modules/drizzle';
import { casbinRules, type DBCasbinRule } from 'src/db/schema';

// local modules
import type { FindManyPermissionsDTO } from '../dto/find-many-permission-polices.dto';

@Injectable()
export class PermissionPolicyRepository {
  constructor(
    @Inject(DRIZZLE_SRV)
    private readonly db: DB,
  ) {}

  findOne(
    db: DB | null,
    id: string,
  ): Effect.Effect<DBCasbinRule | null, Error> {
    return Effect.tryPromise(() =>
      (db || this.db).query.casbinRules.findFirst({
        where: (casbinRules, { eq }) => eq(casbinRules.id, id),
      }),
    ).pipe(Effect.map((founded) => founded || null));
  }

  findMany(
    db: DB | null,
    dto: FindManyPermissionsDTO,
  ): Effect.Effect<DBCasbinRule[], Error> {
    return Effect.tryPromise(() =>
      (db || this.db).query.casbinRules.findMany({
        limit: dto.page.limit,
        offset: dto.page.offset,
        orderBy: (casbinRules, { asc, desc }) =>
          dto.sort.startsWith('-')
            ? desc(casbinRules.created_at)
            : asc(casbinRules.created_at),
      }),
    );
  }

  findTotal(
    db: DB | null,
    _dto: FindManyPermissionsDTO,
  ): Effect.Effect<number, Error> {
    return Effect.tryPromise(() =>
      (db || this.db).select({ count: count() }).from(casbinRules),
    ).pipe(
      Effect.flatMap((founded) => {
        const total = founded.at(0)?.count;
        return total === undefined
          ? Effect.fail(new InternalServerErrorException())
          : Effect.succeed(total);
      }),
    );
  }

  deleteOne(db: DB | null, id: string): Effect.Effect<void, Error> {
    return Effect.tryPromise(() =>
      (db || this.db).delete(casbinRules).where(eq(casbinRules.id, id)),
    ).pipe(Effect.map(() => void 0));
  }
}
