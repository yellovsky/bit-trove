import { ApiProperty } from '@nestjs/swagger';
import { Effect, pipe } from 'effect/index';

import type { AlternativeArticle, ShortArticle } from '@repo/api-models';

import { AuthorDto } from 'src/shared/dto/author.dto';
import { type ExclusionReason, NotEnoughDataReason } from 'src/shared/excluded';

import { TagDto } from 'src/modules/tags/presentation/dtos/tag.dto';

import type { ArticleModel } from '../../domain/models/article.model';

export class ArticleAlternativeDto implements AlternativeArticle {
  @ApiProperty({
    description: 'The ID of the article alternative',
    type: String,
  })
  readonly id!: string;

  @ApiProperty({
    description: 'The language code of the article alternative',
    type: String,
  })
  readonly languageCode!: string;

  @ApiProperty({
    description: 'The slug of the article alternative',
    type: String,
  })
  readonly slug!: string;

  constructor(data: AlternativeArticle) {
    Object.assign(this, data);
  }
}

export class ShortArticleDto implements ShortArticle {
  @ApiProperty({
    description: 'The ID of the article',
    type: String,
  })
  readonly id!: string;

  @ApiProperty({
    description: 'The slug of the article',
    type: String,
  })
  readonly slug!: string;

  @ApiProperty({
    description: 'The title of the article',
    type: String,
  })
  readonly title!: string;

  @ApiProperty({
    description: 'The published date of the article',
    type: String,
  })
  readonly publishedAt!: string | null;

  @ApiProperty({
    description: 'The language code of the article',
    type: String,
  })
  readonly languageCode!: string;

  @ApiProperty({
    description: 'The short description of the article',
    type: String,
  })
  readonly shortDescription!: string | null;

  @ApiProperty({
    description: 'The author of the article',
    type: AuthorDto,
  })
  readonly author!: AuthorDto;

  @ApiProperty({
    description: 'The created date of the article',
    type: String,
  })
  readonly createdAt!: string;

  @ApiProperty({
    description: 'The entry ID of the article',
    type: String,
  })
  readonly entryId!: string;

  @ApiProperty({
    description: 'The reading time of the article',
    type: Number,
  })
  readonly readingTime!: number;

  @ApiProperty({
    description: 'The alternatives of the article',
    type: [ArticleAlternativeDto],
  })
  readonly alternatives!: ArticleAlternativeDto[];

  @ApiProperty({
    description: 'The tags of the article',
    type: [TagDto],
  })
  readonly tags!: TagDto[];

  @ApiProperty({
    description: 'The type of the article',
    type: String,
  })
  readonly type!: 'blog_post';

  static fromModel(model: ArticleModel): Effect.Effect<ShortArticleDto, ExclusionReason> {
    return pipe(
      Effect.all({
        author: model.author ? AuthorDto.fromModel(model.author) : Effect.succeed(null),
        tags: Effect.allSuccesses(model.tags.map((tag) => TagDto.fromModel(tag))),
        type:
          model.type === 'blog_post' || model.type === 'shard'
            ? Effect.succeed(model.type as 'blog_post' | 'shard')
            : Effect.fail(new NotEnoughDataReason({ message: 'unknown article type' })),
      }),
      Effect.map(
        ({ tags, author, type }) =>
          new ShortArticleDto({
            alternatives: model.alternatives.map((alternative) => new ArticleAlternativeDto(alternative)),
            author,
            createdAt: model.createdAt.toISOString(),
            entryId: model.entryId,
            id: model.id,
            languageCode: model.languageCode,
            publishedAt: model.publishedAt?.toISOString() ?? null,
            readingTime: model.readingTime,
            shortDescription: model.shortDescription,
            slug: model.slug,
            tags,
            title: model.title,
            type,
          })
      )
    );
  }

  constructor(data: ShortArticle) {
    Object.assign(this, data);
  }
}
