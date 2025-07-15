import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import type { TransactionContext } from 'src/modules/prisma';

import type { TagModel } from '../models/tag.model';

export interface FindAllTagsParams {
  filter?: {
    like?: string;
  };
}

export interface TagsRepository {
  findAll(txCtx: TransactionContext, params: FindAllTagsParams): Effect.Effect<TagModel[], UnknownException>;
  findTagsByNames(txCtx: TransactionContext, names: string[]): Effect.Effect<TagModel[], UnknownException>;
  createManyTags(txCtx: TransactionContext, names: string[]): Effect.Effect<TagModel[], UnknownException>;
}

export const TAGS_REPOSITORY = 'TAGS_REPOSITORY' as InjectableIdentifier<TagsRepository>;
