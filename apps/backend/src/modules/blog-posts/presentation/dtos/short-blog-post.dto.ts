import { ApiProperty } from '@nestjs/swagger';

import type { AlternativeBlogPost, ShortBlogPost } from '@repo/api-models';

import type { LocalizedShortBlogPostModel } from '../../domain/models/localized-short-blog-post.model';

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
  readonly shortDescription!: string;

  @ApiProperty({
    description: 'The alternatives of the blog post',
    type: [BlogPostAlternativeDto],
  })
  readonly alternatives!: BlogPostAlternativeDto[];

  static fromModel(model: LocalizedShortBlogPostModel): ShortBlogPostDto {
    return new ShortBlogPostDto({
      alternatives: model.alternatives.map((alternative) => new BlogPostAlternativeDto(alternative)),
      id: model.id,
      languageCode: model.languageCode,
      publishedAt: model.publishedAt?.toISOString() ?? null,
      shortDescription: model.shortDescription,
      slug: model.slug,
      title: model.title,
    });
  }

  constructor(data: ShortBlogPost) {
    Object.assign(this, data);
  }
}
