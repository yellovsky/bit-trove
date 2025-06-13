import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ShardModel } from '../../domain/models/shard.model';

export interface GetShardByIdParams {
  id: string;
  published?: boolean;
}

export interface GetShardBySlugParams {
  slug: string;
  published?: boolean;
}

export interface GetShardBySlugOrIdParams {
  slugOrId: string;
  published?: boolean;
}

export interface ShardsService {
  getShardById(
    reqCtx: RequestContext,
    params: GetShardByIdParams
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException>;

  getShardBySlug(
    reqCtx: RequestContext,
    params: GetShardBySlugParams
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException>;

  getShardBySlugOrId(
    reqCtx: RequestContext,
    params: GetShardBySlugOrIdParams
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException>;
}

export const SHARDS_SRV = 'SHARDS_SRV' as InjectableIdentifier<ShardsService>;
