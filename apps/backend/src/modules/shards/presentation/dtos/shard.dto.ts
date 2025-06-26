import { ApiProperty } from '@nestjs/swagger';
import { Effect, pipe } from 'effect';

import type { JSONContent, Shard } from '@repo/api-models';

import { AuthorDto } from 'src/shared/dto/author.dto';
import { SeoDto } from 'src/shared/dto/seo.dto';
import { type ExclusionReason, NotEnoughDataReason } from 'src/shared/excluded';

import { TagDto } from 'src/modules/tags/presentation/dtos/tag.dto';

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
  readonly contentJSON!: JSONContent;

  @ApiProperty({
    description: 'The entry ID of the shard',
    type: String,
  })
  readonly entryId!: string;

  @ApiProperty({
    description: 'The alternatives of the shard',
    type: [AlternativeShardDto],
  })
  readonly alternatives!: AlternativeShardDto[];

  @ApiProperty({
    description: 'The tags of the shard',
    type: [TagDto],
  })
  readonly tags!: TagDto[];

  @ApiProperty({
    description: 'The created date of the shard',
    type: String,
  })
  readonly createdAt!: string;

  @ApiProperty({
    description: 'The author of the shard',
    nullable: true,
    type: AuthorDto,
  })
  readonly author!: AuthorDto | null;

  static fromModel(model: ShardModel): Effect.Effect<ShardDto, ExclusionReason> {
    return pipe(
      Effect.all({
        author: model.author ? AuthorDto.fromModel(model.author) : Effect.succeed(null),

        contentJSON: pipe(
          Effect.fromNullable(model.contentJSON),
          Effect.mapError(() => new NotEnoughDataReason())
        ),
        seo: pipe(
          Effect.fromNullable(model.seo),
          Effect.map((seoModel) => SeoDto.fromModel(seoModel)),
          Effect.mapError(() => new NotEnoughDataReason())
        ),

        tags: Effect.allSuccesses(model.tags.map((tag) => TagDto.fromModel(tag))),
      }),

      Effect.map(
        ({ author, contentJSON, seo, tags }) =>
          new ShardDto({
            alternatives: model.alternatives.map((alternative) => new AlternativeShardDto(alternative)),
            author,
            contentJSON,
            createdAt: model.createdAt.toISOString(),
            entryId: model.entryId,
            id: model.id,
            languageCode: model.languageCode,
            publishedAt: model.publishedAt?.toISOString() ?? null,
            seo,
            shortDescription: model.shortDescription,
            slug: model.slug,
            tags,
            title: model.title,
          })
      )
    );
  }

  constructor(data: Shard) {
    Object.assign(this, data);
  }
}
