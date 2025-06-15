import { ApiProperty } from '@nestjs/swagger';
import { Effect } from 'effect';

import type { ShortShard } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';

import type { ShardModel } from '../../domain/models/shard.model';
import { AlternativeShardDto } from './alternative-shard.dto';

export class ShortShardDto implements ShortShard {
  @ApiProperty({
    description: 'The ID of the blog post',
    type: String,
  })
  readonly id!: string;

  @ApiProperty({
    description: 'The slug of the blog post',
    type: String,
  })
  readonly slug!: string;

  @ApiProperty({
    description: 'The title of the blog post',
    type: String,
  })
  readonly title!: string;

  @ApiProperty({
    description: 'The published date of the blog post',
    type: String,
  })
  readonly publishedAt!: string | null;

  @ApiProperty({
    description: 'The language code of the blog post',
    type: String,
  })
  readonly languageCode!: string;

  @ApiProperty({
    description: 'The short description of the blog post',
    nullable: true,
    type: String,
  })
  readonly shortDescription!: string | null;

  @ApiProperty({
    description: 'The created date of the blog post',
    type: String,
  })
  readonly createdAt!: string;

  @ApiProperty({
    description: 'The entry ID of the blog post',
    type: String,
  })
  readonly entryId!: string;

  @ApiProperty({
    description: 'The alternatives of the blog post',
    type: [AlternativeShardDto],
  })
  readonly alternatives!: AlternativeShardDto[];

  static fromModel(model: ShardModel): Effect.Effect<ShortShardDto, ExclusionReason> {
    return Effect.succeed(
      new ShortShardDto({
        alternatives: model.alternatives.map((alternative) => new AlternativeShardDto(alternative)),
        createdAt: model.createdAt.toISOString(),
        entryId: model.entryId,
        id: model.id,
        languageCode: model.languageCode,
        publishedAt: model.publishedAt?.toISOString() ?? null,
        shortDescription: model.shortDescription,
        slug: model.slug,
        title: model.title,
      })
    );
  }

  constructor(data: ShortShard) {
    Object.assign(this, data);
  }
}
