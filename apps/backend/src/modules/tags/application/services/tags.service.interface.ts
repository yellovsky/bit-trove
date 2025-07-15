import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { TagModel } from '../../domain/models/tag.model';

export interface GetAllTagsParams {
  filter?: { like?: string };
}

export interface TagsService {
  getAllTags(txReqCtx: TxRequestContext, params: GetAllTagsParams): Effect.Effect<TagModel[], UnknownException>;
  getOrCreateTagsByNames(txReqCtx: TxRequestContext, names: string[]): Effect.Effect<TagModel[], UnknownException>;
}

export const TAGS_SRV = 'TAGS_SRV' as InjectableIdentifier<TagsService>;
