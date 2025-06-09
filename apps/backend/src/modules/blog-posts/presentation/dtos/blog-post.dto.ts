import { ApiProperty } from '@nestjs/swagger';

import type { BlogPost } from '@repo/api-models';

import { SeoDto } from 'src/shared/dto/seo.dto';

import type { LocalizedBlogPostModel } from '../../domain/models/localized-blog-post.model';
import { BlogPostAlternativeDto } from './short-blog-post.dto';

export class BlogPostDto implements BlogPost {
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
    type: String,
  })
  readonly shortDescription!: string;

  @ApiProperty({
    description: 'The content of the blog post',
    type: String,
  })
  readonly contentJSON!: BlogPost['contentJSON'];

  @ApiProperty({
    description: 'The alternatives of the blog post',
    type: [BlogPostAlternativeDto],
  })
  readonly alternatives!: BlogPostAlternativeDto[];

  static fromModel(model: LocalizedBlogPostModel): BlogPostDto {
    return new BlogPostDto({
      alternatives: model.alternatives.map((alternative) => new BlogPostAlternativeDto(alternative)),
      contentJSON: model.contentJSON,
      id: model.id,
      languageCode: model.languageCode,
      publishedAt: model.publishedAt?.toISOString() ?? null,
      seo: SeoDto.fromModel(model.seo),
      shortDescription: model.shortDescription,
      slug: model.slug,
      title: model.title,
    });
  }

  constructor(data: BlogPost) {
    Object.assign(this, data);
  }
}
