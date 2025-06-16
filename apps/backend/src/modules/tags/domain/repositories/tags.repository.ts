import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { TagModel } from '../models/tag.model';

export interface FindAllTagsParams {
  filter?: {
    like?: string;
  };
}

export interface TagsRepository {
  findAll(reqCtx: RequestContext, params: FindAllTagsParams): Effect.Effect<TagModel[], UnknownException>;
  findTagsByNames(reqCtx: RequestContext, names: string[]): Effect.Effect<TagModel[], UnknownException>;
  createManyTags(reqCtx: RequestContext, names: string[]): Effect.Effect<TagModel[], UnknownException>;
}

export const TAGS_REPOSITORY = 'TAGS_REPOSITORY' as InjectableIdentifier<TagsRepository>;
