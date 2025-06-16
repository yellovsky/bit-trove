import { ApiProperty } from '@nestjs/swagger';
import { Effect, pipe } from 'effect';

import type { ShortShard } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';

import { TagDto } from 'src/modules/tags/presentation/dtos/tag.dto';

import type { ShardModel } from '../../domain/models/shard.model';
import { AlternativeShardDto } from './alternative-shard.dto';

export class ShortShardDto implements ShortShard {
  @ApiProperty({
    description: 'The ID of the shard',
    type: String,
  })
  readonly id!: string;

  @ApiProperty({
    description: 'The slug of the shard',
    type: String,
  })
  readonly slug!: string;

  @ApiProperty({
    description: 'The title of the shard',
    type: String,
  })
  readonly title!: string;

  @ApiProperty({
    description: 'The published date of the shard',
    type: String,
  })
  readonly publishedAt!: string | null;

  @ApiProperty({
    description: 'The language code of the shard',
    type: String,
  })
  readonly languageCode!: string;

  @ApiProperty({
    description: 'The short description of the shard',
    nullable: true,
    type: String,
  })
  readonly shortDescription!: string | null;

  @ApiProperty({
    description: 'The created date of the shard',
    type: String,
  })
  readonly createdAt!: string;

  @ApiProperty({
    description: 'The entry ID of the shard',
    type: String,
  })
  readonly entryId!: string;

  @ApiProperty({
    description: 'The tags of the shard',
    type: [TagDto],
  })
  readonly tags!: TagDto[];

  @ApiProperty({
    description: 'The alternatives of the shard',
    type: [AlternativeShardDto],
  })
  readonly alternatives!: AlternativeShardDto[];

  static fromModel(model: ShardModel): Effect.Effect<ShortShardDto, ExclusionReason> {
    return pipe(
      Effect.allSuccesses(model.tags.map((tag) => TagDto.fromModel(tag))),
      Effect.map(
        (tags) =>
          new ShortShardDto({
            alternatives: model.alternatives.map((alternative) => new AlternativeShardDto(alternative)),
            createdAt: model.createdAt.toISOString(),
            entryId: model.entryId,
            id: model.id,
            languageCode: model.languageCode,
            publishedAt: model.publishedAt?.toISOString() ?? null,
            shortDescription: model.shortDescription,
            slug: model.slug,
            tags,
            title: model.title,
          })
      )
    );
  }

  constructor(data: ShortShard) {
    Object.assign(this, data);
  }
}
