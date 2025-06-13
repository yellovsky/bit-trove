import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { LocalizedShardModel } from '../../domain/models/localized-shard.model';
import type { LocalizedShortShardModel } from '../../domain/models/localized-short-shard.model';

export interface ShardsAccessService {
  filterCanReadLocalizedShard(
    reqCtx: RequestContext,
    shard: LocalizedShardModel
  ): Effect.Effect<LocalizedShardModel, ExclusionReason | UnknownException>;

  filterCanReadShortLocalizedShard(
    reqCtx: RequestContext,
    shard: LocalizedShortShardModel
  ): Effect.Effect<LocalizedShortShardModel, ExclusionReason | UnknownException>;

  filterCanReadLocalizedShortShardList(
    reqCtx: RequestContext,
    shards: LocalizedShortShardModel[]
  ): Effect.Effect<Array<LocalizedShortShardModel | ExclusionReason>, UnknownException>;

  canCreateShard(reqCtx: RequestContext): Effect.Effect<true, ExclusionReason | UnknownException>;
}

export const SHARDS_ACCESS_SRV = 'SHARDS_ACCESS_SRV' as InjectableIdentifier<ShardsAccessService>;
