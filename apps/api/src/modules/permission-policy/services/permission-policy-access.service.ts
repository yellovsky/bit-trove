// global modules
import { Effect } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { CasbinService } from 'src/modules/casbin';
import type { DBAccount } from 'src/modules/account';
import type { DBCasbinRule } from '../../../db/schema';

@Injectable()
export class PermissionPolicyAccessService {
  constructor(
    @Inject()
    private readonly casbinSrv: CasbinService,
  ) {}

  canReadCMS(
    account: DBAccount | null,
    policy: DBCasbinRule,
  ): Effect.Effect<boolean, Error> {
    return this.casbinSrv.checkPermission(
      account?.id,
      'read_cms',
      'permission_policy',
      policy,
    );
  }

  canReadCMSFilter(
    user: DBAccount | null,
    policies: Array<DBCasbinRule | null>,
  ): Effect.Effect<Array<DBCasbinRule | null>, Error> {
    return Effect.all(
      policies.map((policy) =>
        !policy
          ? Effect.succeed(null)
          : this.casbinSrv
              .checkPermission(user?.id, 'read_cms', 'tutorial', policy)
              .pipe(Effect.map((allowed) => (allowed ? policy : null))),
      ),
    );
  }
}
