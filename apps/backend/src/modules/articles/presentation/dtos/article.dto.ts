import { ApiProperty } from '@nestjs/swagger';
import { Effect, pipe } from 'effect';

import type { Article, JSONContent } from '@repo/api-models';

import { AuthorDto } from 'src/shared/dto/author.dto';
import { SeoDto } from 'src/shared/dto/seo.dto';
import { type ExclusionReason, NotEnoughDataReason } from 'src/shared/excluded';

import { TagDto } from 'src/modules/tags/presentation/dtos/tag.dto';

import type { ArticleModel } from '../../domain/models/article.model';
import { AlternativeArticleDto } from './alternative-article.dto';

export class ArticleDto implements Article {
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
    description: 'The published date of the article',
    type: SeoDto,
  })
  readonly seo!: SeoDto;

  @ApiProperty({
    description: 'The language code of the article',
    type: String,
  })
  readonly languageCode!: string;

  @ApiProperty({
    description: 'The short title of the article',
    nullable: true,
    type: String,
  })
  readonly shortDescription!: string | null;

  @ApiProperty({
    description: 'The estimated reading time in minutes',
    maximum: 999,
    minimum: 1,
    type: Number,
  })
  readonly readingTime!: number;

  @ApiProperty({
    description: 'The content of the article',
    type: String,
  })
  readonly contentJSON!: JSONContent | null;

  @ApiProperty({
    description: 'The entry ID of the shard',
    type: String,
  })
  readonly entryId!: string;

  @ApiProperty({
    description: 'The alternatives of the shard',
    type: [AlternativeArticleDto],
  })
  readonly alternatives!: AlternativeArticleDto[];

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

  @ApiProperty({
    description: 'The type of the article',
    type: String,
  })
  readonly type!: 'blog_post';

  static fromModel(model: ArticleModel): Effect.Effect<ArticleDto, ExclusionReason> {
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

        type:
          model.type === 'blog_post' || model.type === 'shard'
            ? Effect.succeed(model.type as 'blog_post' | 'shard')
            : Effect.fail(new NotEnoughDataReason({ message: 'unknown article type' })),
      }),

      Effect.map(
        ({ author, contentJSON, seo, tags, type }) =>
          new ArticleDto({
            alternatives: model.alternatives.map((alternative) => new AlternativeArticleDto(alternative)),
            author,
            contentJSON,
            createdAt: model.createdAt.toISOString(),
            entryId: model.entryId,
            id: model.id,
            languageCode: model.languageCode,
            publishedAt: model.publishedAt?.toISOString() ?? null,
            readingTime: model.readingTime,
            seo,
            shortDescription: model.shortDescription,
            slug: model.slug,
            tags,
            title: model.title,
            type,
          })
      )
    );
  }

  constructor(data: Article) {
    Object.assign(this, data);
  }
}
