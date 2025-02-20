// global modules
import { Effect } from 'effect';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { count, eq } from 'drizzle-orm';

import {
  Inject,
  Injectable,
  InternalServerErrorException,
  LoggerService,
} from '@nestjs/common';

// common modules
import type { DB } from 'src/db';
import { DRIZZLE_SRV } from 'src/modules/drizzle';
import { casbinRules, type DBCasbinRule } from 'src/db/schema';

// local modules
import type { FindManyPermissionsDTO } from '../dto/find-many-permission-polices.dto';
import type { UpsertPermissionPolicyDTO } from '../dto/upsert-permission-policy.dto';

@Injectable()
export class PermissionPolicyRepository {
  constructor(
    @Inject(DRIZZLE_SRV)
    private readonly db: DB,

    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
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
        where: eq(casbinRules.ptype, 'p'),

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
      (db || this.db)
        .select({ count: count() })
        .from(casbinRules)
        .where(eq(casbinRules.ptype, 'p')),
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

  update(
    tx: DB | null,
    id: string,
    dto: UpsertPermissionPolicyDTO,
  ): Effect.Effect<DBCasbinRule | null, Error> {
    this.logger.debug?.(
      `id: ${id}`,
      `${PermissionPolicyRepository.name}.update`,
    );

    this.logger.debug?.(
      `dto: ${JSON.stringify(dto)}`,
      `${PermissionPolicyRepository.name}.update`,
    );

    return Effect.tryPromise(() =>
      (tx || this.db)
        .update(casbinRules)
        .set({
          note: dto.note,
          ptype: 'p',
          v0: dto.sub,
          v1: dto.act,
          v2: dto.obj_type,
          v3: dto.cond,
        })
        .where(eq(casbinRules.id, id))
        .returning({
          created_at: casbinRules.created_at,
          id: casbinRules.id,
          note: casbinRules.note,
          ptype: casbinRules.ptype,
          v0: casbinRules.v0,
          v1: casbinRules.v1,
          v2: casbinRules.v2,
          v3: casbinRules.v3,
          v4: casbinRules.v4,
          v5: casbinRules.v5,
        }),
    ).pipe(Effect.map((founded) => founded.at(0) || null));
  }

  create(
    tx: DB | null,
    dto: UpsertPermissionPolicyDTO,
  ): Effect.Effect<DBCasbinRule | null, Error> {
    this.logger.debug?.(
      `dto: ${JSON.stringify(dto)}`,
      `${PermissionPolicyRepository.name}.create`,
    );

    return Effect.tryPromise(() =>
      (tx || this.db)
        .insert(casbinRules)
        .values({
          note: dto.note,
          ptype: 'p',
          v0: dto.sub,
          v1: dto.act,
          v2: dto.obj_type,
          v3: dto.cond,
        })
        .returning({
          created_at: casbinRules.created_at,
          id: casbinRules.id,
          note: casbinRules.note,
          ptype: casbinRules.ptype,
          v0: casbinRules.v0,
          v1: casbinRules.v1,
          v2: casbinRules.v2,
          v3: casbinRules.v3,
          v4: casbinRules.v4,
          v5: casbinRules.v5,
        }),
    ).pipe(Effect.map((founded) => founded.at(0) || null));
  }
}
