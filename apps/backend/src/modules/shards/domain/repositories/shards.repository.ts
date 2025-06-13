import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { JSONContent } from '@repo/api-models';

import type { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { LocalizedShardModel } from '../models/localized-shard.model';
import type { LocalizedShortShardModel } from '../models/localized-short-shard.model';

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
  shardId: string | null;
}

export type FindManyShardsOrderBy = { title: 'asc' | 'desc' } | { publishedAt: 'asc' | 'desc' };

export interface FindManyShardsFilter {
  published?: boolean;
  authorId?: string | null;
  languageCode?: string;
  languageCodeIn?: string[];
}

export interface FindManyShardsParams {
  take: number;
  skip: number;
  orderBy: FindManyShardsOrderBy;
  filter: FindManyShardsFilter;
}

export interface ShardsRepository {
  createShard(
    reqCtx: RequestContext,
    params: CreateShardParams
  ): Effect.Effect<LocalizedShardModel, UnknownReason | UnknownException>;

  checkSlugAvailability(reqCtx: RequestContext, slug: string): Effect.Effect<boolean, UnknownException>;

  findManyLocalized(
    reqCtx: RequestContext,
    params: FindManyShardsParams
  ): Effect.Effect<LocalizedShortShardModel[], ExclusionReason | UnknownException>;

  findTotalLocalized(reqCtx: RequestContext, params: FindManyShardsParams): Effect.Effect<number, UnknownException>;
}

export const SHARDS_REPOSITORY = 'SHARDS_REPOSITORY' as InjectableIdentifier<ShardsRepository>;
