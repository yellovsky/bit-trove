import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { TagModel } from '../../domain/models/tag.model';

export interface GetAllTagsParams {
  filter?: { like?: string };
}

export interface TagsService {
  getAllTags(reqCtx: RequestContext, params: GetAllTagsParams): Effect.Effect<TagModel[], UnknownException>;
  getOrCreateTagsByNames(reqCtx: RequestContext, names: string[]): Effect.Effect<TagModel[], UnknownException>;
}

export const TAGS_SRV = 'TAGS_SRV' as InjectableIdentifier<TagsService>;
