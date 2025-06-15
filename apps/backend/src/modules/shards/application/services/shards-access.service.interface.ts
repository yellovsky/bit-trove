import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ShardModel } from '../../domain/models/shard.model';

export interface ShardsAccessService {
  filterCanReadShard(
    reqCtx: RequestContext,
    shard: ShardModel
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException>;

  filterCanReadShardList(
    reqCtx: RequestContext,
    shards: ShardModel[]
  ): Effect.Effect<Array<ShardModel | ExclusionReason>, UnknownException>;

  canCreateShard(reqCtx: RequestContext): Effect.Effect<true, ExclusionReason | UnknownException>;
  canUpdateShard(reqCtx: RequestContext, shard: ShardModel): Effect.Effect<true, ExclusionReason | UnknownException>;
}

export const SHARDS_ACCESS_SRV = 'SHARDS_ACCESS_SRV' as InjectableIdentifier<ShardsAccessService>;
