import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { UpsertShardBody } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';
import type { OrderBy } from 'src/shared/utils/sort-to-order-by';

import type { ShardModel } from '../../domain/models/shard.model';

export interface GetShardByIdParams {
  id: string;
  authorId?: string;
  published?: boolean;
}

export interface GetShardBySlugParams {
  slug: string;
  authorId?: string;
  published?: boolean;
}

export interface GetShardBySlugOrIdParams {
  slugOrId: string;
  published?: boolean;
}

export interface GetManyShardsParams {
  take: number;
  skip: number;
  orderBy: OrderBy<'title' | 'createdAt'>;

  filter: {
    published?: boolean;
    authorId?: string | null;
    languageCodeIn?: string[];
  };
}

export type CreateShardParams = UpsertShardBody;
export type UpdateShardParams = UpsertShardBody;

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

  getManyShards(
    reqCtx: RequestContext,
    params: GetManyShardsParams
  ): Effect.Effect<Array<ShardModel | ExclusionReason>, ExclusionReason | UnknownException>;

  createShard(
    reqCtx: RequestContext,
    body: CreateShardParams
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException>;

  updateShard(
    reqCtx: RequestContext,
    id: string,
    body: UpdateShardParams
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException>;

  publishShard(reqCtx: RequestContext, id: string): Effect.Effect<ShardModel, ExclusionReason | UnknownException>;
  unpublishShard(reqCtx: RequestContext, id: string): Effect.Effect<ShardModel, ExclusionReason | UnknownException>;
}

export const SHARDS_SRV = 'SHARDS_SRV' as InjectableIdentifier<ShardsService>;
