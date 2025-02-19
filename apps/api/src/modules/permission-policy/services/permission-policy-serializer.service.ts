// global modules
import { Effect } from 'effect';
import { Injectable } from '@nestjs/common';

// common modules
import type { DBCasbinRule } from 'src/db/schema';

// local modules
import { PermissionPolicyEntity } from '../entities/permission-policy.entity';

@Injectable()
export class PermissionPolicySerializerService {
  serialize(
    policy: DBCasbinRule,
  ): Effect.Effect<PermissionPolicyEntity, Error> {
    return Effect.gen(this, function* () {
      return new PermissionPolicyEntity({
        act: policy.v1,
        cond: policy.v3,
        created_at: policy.created_at.toISOString(),
        id: policy.id,
        note: policy.note,
        obj_type: policy.v2,
        sub: policy.v0,
      });
    });
  }

  serializeList(
    tutorials: Array<DBCasbinRule | null>,
  ): Effect.Effect<Array<PermissionPolicyEntity | null>, Error> {
    return Effect.all(
      tutorials.map((tutorial) =>
        !tutorial ? Effect.succeed(null) : this.serialize(tutorial),
      ),
    );
  }
}
