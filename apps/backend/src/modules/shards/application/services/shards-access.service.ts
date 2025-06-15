import { Inject } from '@nestjs/common';
import { Effect, pipe } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { CASBIN_SRV } from 'src/modules/casbin';

import type { ShardModel } from '../../domain/models/shard.model';
import type { ShardsAccessService } from './shards-access.service.interface';

export class ShardsAccessServiceImpl implements ShardsAccessService {
  constructor(
    @Inject(CASBIN_SRV)
    private readonly casbinSrv: IdentifierOf<typeof CASBIN_SRV>
  ) {}

  canCreateShard(reqCtx: RequestContext): Effect.Effect<true, ExclusionReason | UnknownException> {
    return this.casbinSrv.checkRequestPermission(reqCtx, 'create', 'shard', {});
  }

  filterCanReadShard(
    reqCtx: RequestContext,
    shard: ShardModel | ShardModel
  ): Effect.Effect<ShardModel | ShardModel, ExclusionReason | UnknownException> {
    return pipe(
      this.casbinSrv.checkRequestPermission(reqCtx, 'read', 'shard', shard),
      Effect.map(() => shard)
    );
  }

  filterCanReadShardList(
    reqCtx: RequestContext,
    shards: ShardModel[]
  ): Effect.Effect<Array<ShardModel | ExclusionReason>, UnknownException> {
    return Effect.all(
      shards.map((shard) =>
        this.filterCanReadShard(reqCtx, shard).pipe(
          Effect.catchAll((err) => (err instanceof ExclusionReason ? Effect.succeed(err) : Effect.fail(err)))
        )
      )
    );
  }

  canUpdateShard(reqCtx: RequestContext, shard: ShardModel): Effect.Effect<true, ExclusionReason | UnknownException> {
    return this.casbinSrv.checkRequestPermission(reqCtx, 'update', 'shard', shard);
  }
}
