import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { JSONContent } from '@repo/api-models';

import type { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';
import type { OrderBy } from 'src/shared/utils/sort-to-order-by';

import type { ShardModel } from '../models/shard.model';

export interface CreateShardParams {
  contentJSON: JSONContent | null;
  languageCode: string;
  published: boolean;
  shortDescription: string | null;
  slug: string;
  title: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  entryId: string | null;
  tags: string[];
}
export type UpdateShardParams = CreateShardParams;
export type FindManyShardsOrderBy = OrderBy<'title' | 'publishedAt' | 'createdAt'>;

export interface FindManyShardsFilter {
  published?: boolean;
  authorId?: string | null;
  languageCodeIn?: string[];
}

export interface FindManyShardsParams {
  take: number;
  skip: number;
  orderBy: FindManyShardsOrderBy;
  filter: FindManyShardsFilter;
}

export interface FindBySlugParams {
  slug: string;
  published?: boolean;
}

export interface FindByIdParams {
  id: string;
  authorId?: string;
  published?: boolean;
}

export interface ShardsRepository {
  createShard(
    reqCtx: RequestContext,
    params: CreateShardParams
  ): Effect.Effect<ShardModel, UnknownReason | UnknownException>;

  updateShard(
    reqCtx: RequestContext,
    id: string,
    params: UpdateShardParams
  ): Effect.Effect<ShardModel, UnknownReason | UnknownException>;

  getShardIdBySlug(reqCtx: RequestContext, slug: string): Effect.Effect<string | null, UnknownException>;

  findManyShards(
    reqCtx: RequestContext,
    params: FindManyShardsParams
  ): Effect.Effect<ShardModel[], ExclusionReason | UnknownException>;

  findTotalShards(reqCtx: RequestContext, params: FindManyShardsParams): Effect.Effect<number, UnknownException>;

  findOneShardById(
    reqCtx: RequestContext,
    params: FindByIdParams
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException>;

  findOneShardBySlug(
    reqCtx: RequestContext,
    params: FindBySlugParams
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException>;

  setShardPublished(
    reqCtx: RequestContext,
    id: string,
    published: boolean
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException>;
}

export const SHARDS_REPOSITORY = 'SHARDS_REPOSITORY' as InjectableIdentifier<ShardsRepository>;
