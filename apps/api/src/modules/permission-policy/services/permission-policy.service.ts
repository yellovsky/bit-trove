// global modules
import { Effect } from 'effect';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

// common modules
import type { DB } from 'src/db';
import type { DBCasbinRule } from 'src/db/schema';

// local modules
import type { FindManyPermissionsDTO } from '../dto/find-many-permission-polices.dto';
import { PermissionPolicyRepository } from '../repositories/permission-policy.repository';

@Injectable()
export class PermissionPolicyService {
  constructor(
    @Inject()
    private readonly permissionPolicyRepo: PermissionPolicyRepository,
  ) {}

  getOne(tx: DB | null, id: string): Effect.Effect<DBCasbinRule, Error> {
    return this.permissionPolicyRepo.findOne(tx, id).pipe(
      Effect.flatMap((founded) => {
        if (!founded) return Effect.fail(new NotFoundException());
        else return Effect.succeed(founded);
      }),
    );
  }

  getMany(
    tx: DB | null,
    dto: FindManyPermissionsDTO,
  ): Effect.Effect<Array<DBCasbinRule | null>, Error> {
    return this.permissionPolicyRepo.findMany(tx, dto);
  }

  getTotal(
    tx: DB | null,
    dto: FindManyPermissionsDTO,
  ): Effect.Effect<number, Error> {
    return this.permissionPolicyRepo.findTotal(tx, dto);
  }

  deleteOne(tx: DB | null, id: string): Effect.Effect<void, Error> {
    return this.permissionPolicyRepo.deleteOne(tx, id);
  }
}
