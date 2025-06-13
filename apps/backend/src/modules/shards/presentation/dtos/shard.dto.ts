import { ApiProperty } from '@nestjs/swagger';
import { Effect } from 'effect';

import type { JSONContent, Shard } from '@repo/api-models';

import { SeoDto } from 'src/shared/dto/seo.dto';
import { type ExclusionReason, NotEnoughDataReason } from 'src/shared/excluded';

import type { ShardModel } from '../../domain/models/shard.model';
import { AlternativeShardDto } from './alternative-shard.dto';

export class ShardDto implements Shard {
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
    description: 'The published date of the blog post',
    type: SeoDto,
  })
  readonly seo!: SeoDto;

  @ApiProperty({
    description: 'The language code of the blog post',
    type: String,
  })
  readonly languageCode!: string;

  @ApiProperty({
    description: 'The short title of the blog post',
    nullable: true,
    type: String,
  })
  readonly shortDescription!: string | null;

  @ApiProperty({
    description: 'The content of the blog post',
    type: String,
  })
  readonly contentJSON!: JSONContent | null;

  @ApiProperty({
    description: 'The alternatives of the blog post',
    type: [AlternativeShardDto],
  })
  readonly alternatives!: AlternativeShardDto[];

  @ApiProperty({
    description: 'The created date of the blog post',
    type: String,
  })
  readonly createdAt!: string;

  static fromModel(model: ShardModel): Effect.Effect<ShardDto, ExclusionReason> {
    if (!model.seo) return Effect.fail(new NotEnoughDataReason());

    return Effect.succeed(
      new ShardDto({
        alternatives: model.alternatives.map((alternative) => new AlternativeShardDto(alternative)),
        contentJSON: model.contentJSON,
        createdAt: model.createdAt.toISOString(),
        id: model.id,
        languageCode: model.languageCode,
        publishedAt: model.publishedAt?.toISOString() ?? null,
        seo: SeoDto.fromModel(model.seo),
        shortDescription: model.shortDescription,
        slug: model.slug,
        title: model.title,
      })
    );
  }

  constructor(data: Shard) {
    Object.assign(this, data);
  }
}
