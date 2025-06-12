import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { JSONContent } from '@repo/api-models';

import type { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { LocalizedShortThoughtModel } from '../models/localized-short-thought.model';
import type { LocalizedThoughtModel } from '../models/localized-thought.model';

export interface CreateThoughtParams {
  contentJSON: JSONContent | null;
  languageCode: string;
  published: boolean;
  shortDescription: string | null;
  slug: string;
  title: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  thoughtId: string | null;
}

export type FindManyThoughtsOrderBy = { title: 'asc' | 'desc' } | { publishedAt: 'asc' | 'desc' };

export interface FindManyThoughtsFilter {
  published?: boolean;
  authorId?: string | null;
  languageCode?: string;
  languageCodeIn?: string[];
}

export interface FindManyThoughtsParams {
  take: number;
  skip: number;
  orderBy: FindManyThoughtsOrderBy;
  filter: FindManyThoughtsFilter;
}

export interface ThoughtsRepository {
  createThought(
    reqCtx: RequestContext,
    params: CreateThoughtParams
  ): Effect.Effect<LocalizedThoughtModel, UnknownReason | UnknownException>;

  checkSlugAvailability(reqCtx: RequestContext, slug: string): Effect.Effect<boolean, UnknownException>;

  findManyLocalized(
    reqCtx: RequestContext,
    params: FindManyThoughtsParams
  ): Effect.Effect<LocalizedShortThoughtModel[], ExclusionReason | UnknownException>;

  findTotalLocalized(reqCtx: RequestContext, params: FindManyThoughtsParams): Effect.Effect<number, UnknownException>;
}

export const THOUGHTS_REPOSITORY = 'THOUGHTS_REPOSITORY' as InjectableIdentifier<ThoughtsRepository>;
