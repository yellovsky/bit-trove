import { ApiProperty } from '@nestjs/swagger';
import { Effect } from 'effect';

import type { Tag } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';

import type { TagModel } from '../../domain/models/tag.model';

export class TagDto implements Tag {
  @ApiProperty({
    description: 'The ID of the tag',
    type: String,
  })
  readonly id!: string;

  @ApiProperty({
    description: 'The slug of the tag',
    type: String,
  })
  readonly slug!: string;

  @ApiProperty({
    description: 'The name of the tag',
    type: String,
  })
  readonly name!: string;

  static fromModel(model: TagModel): Effect.Effect<TagDto, ExclusionReason> {
    return Effect.succeed(new TagDto({ id: model.id, name: model.name, slug: model.slug }));
  }

  constructor(data: Tag) {
    Object.assign(this, data);
  }
}
