import { Inject } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { TagModel } from '../../domain/models/tag.model';
import { TAGS_REPOSITORY } from '../../domain/repositories/tags.repository';
import type { GetAllTagsParams, TagsService } from './tags.service.interface';

export class TagsServiceImpl implements TagsService {
  constructor(
    @Inject(TAGS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof TAGS_REPOSITORY>
  ) {}

  getAllTags(reqCtx: RequestContext, params: GetAllTagsParams): Effect.Effect<TagModel[], UnknownException> {
    return this.repository.findAll(reqCtx, params);
  }

  getOrCreateTagsByNames(reqCtx: RequestContext, names: string[]): Effect.Effect<TagModel[], UnknownException> {
    return Effect.gen(this, function* () {
      const existingTags = yield* this.repository.findTagsByNames(reqCtx, names);
      const existingTagNames = existingTags.map((tag) => tag.name);
      const newTagNames = names.filter((name) => !existingTagNames.includes(name));
      const newTags = yield* this.repository.createManyTags(reqCtx, newTagNames);
      return [...existingTags, ...newTags];
    });
  }
}
