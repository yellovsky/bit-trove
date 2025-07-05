import { ApiProperty } from '@nestjs/swagger';
import { Effect, pipe } from 'effect/index';

import type { AlternativeBlogPost, ShortBlogPost } from '@repo/api-models';

import { AuthorDto } from 'src/shared/dto/author.dto';
import type { ExclusionReason } from 'src/shared/excluded';

import { TagDto } from 'src/modules/tags/presentation/dtos/tag.dto';

import type { BlogPostModel } from '../../domain/models/blog-post.model';

export class BlogPostAlternativeDto implements AlternativeBlogPost {
  @ApiProperty({
    description: 'The ID of the blog post alternative',
    type: String,
  })
  readonly id!: string;

  @ApiProperty({
    description: 'The language code of the blog post alternative',
    type: String,
  })
  readonly languageCode!: string;

  @ApiProperty({
    description: 'The slug of the blog post alternative',
    type: String,
  })
  readonly slug!: string;

  constructor(data: AlternativeBlogPost) {
    Object.assign(this, data);
  }
}

export class ShortBlogPostDto implements ShortBlogPost {
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
    type: String,
  })
  readonly shortDescription!: string | null;

  @ApiProperty({
    description: 'The author of the blog post',
    type: AuthorDto,
  })
  readonly author!: AuthorDto;

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
    description: 'The reading time of the blog post',
    type: Number,
  })
  readonly readingTime!: number;

  @ApiProperty({
    description: 'The alternatives of the blog post',
    type: [BlogPostAlternativeDto],
  })
  readonly alternatives!: BlogPostAlternativeDto[];

  @ApiProperty({
    description: 'The tags of the blog post',
    type: [TagDto],
  })
  readonly tags!: TagDto[];

  static fromModel(model: BlogPostModel): Effect.Effect<ShortBlogPostDto, ExclusionReason> {
    return pipe(
      Effect.all({
        author: model.author ? AuthorDto.fromModel(model.author) : Effect.succeed(null),
        tags: Effect.allSuccesses(model.tags.map((tag) => TagDto.fromModel(tag))),
      }),
      Effect.map(
        ({ tags, author }) =>
          new ShortBlogPostDto({
            alternatives: model.alternatives.map((alternative) => new BlogPostAlternativeDto(alternative)),
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
          })
      )
    );
  }

  constructor(data: ShortBlogPost) {
    Object.assign(this, data);
  }
}
