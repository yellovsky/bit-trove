// global modules
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

import type {
  BlogPost,
  BlogPostListResponse,
  BlogPostResponse,
  BlogPostSegment,
} from '@repo/api-models';

// common modules
import { ListResponseMetaEntity } from 'src/entities/response';
import { Entity, type WithoutEntityType } from 'src/entities/entity';

// local modules
import {
  type ArticleBlockEntity,
  ArticleCodeBlockEntity,
  ArticleImageBlockEntity,
  ArticleTextBlockEntity,
} from './article';

export class BlogPostSegmentEntity extends Entity implements BlogPostSegment {
  @ApiProperty({ type: String })
  created_at: string;

  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  original_language_code: string;

  @ApiProperty({ nullable: true, type: String })
  published_at: string | null;

  @ApiProperty({ type: String })
  short_description: string;

  @ApiProperty({ type: String })
  slug: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  language_code: string;

  @ApiProperty({ type: [String] })
  language_codes: string[];

  constructor(data: WithoutEntityType<BlogPostSegmentEntity>) {
    super();

    this.created_at = data.created_at;
    this.id = data.id;
    this.original_language_code = data.original_language_code;
    this.published_at = data.published_at;
    this.short_description = data.short_description;
    this.slug = data.slug;
    this.title = data.title;
    this.language_code = data.language_code;
    this.language_codes = data.language_codes;
  }
}

@ApiExtraModels(
  ArticleCodeBlockEntity,
  ArticleTextBlockEntity,
  ArticleImageBlockEntity,
)
export class BlogPostEntity extends BlogPostSegmentEntity implements BlogPost {
  @ApiProperty({
    isArray: true,

    oneOf: [
      { $ref: getSchemaPath(ArticleCodeBlockEntity) },
      { $ref: getSchemaPath(ArticleTextBlockEntity) },
      { $ref: getSchemaPath(ArticleImageBlockEntity) },
    ],
  })
  blocks: ArticleBlockEntity[];

  @ApiProperty({ nullable: true, type: String })
  seo_description: string | null;

  @ApiProperty({ nullable: true, type: String })
  seo_keywords: string | null;

  @ApiProperty({ nullable: true, type: String })
  seo_title: string | null;

  constructor(data: WithoutEntityType<BlogPostEntity>) {
    super(data);

    this.blocks = data.blocks;
    this.seo_description = data.seo_description;
    this.seo_keywords = data.seo_keywords;
    this.seo_title = data.seo_title;
  }
}

export class BlogPostListResponseEntity
  extends Entity
  implements BlogPostListResponse
{
  @ApiProperty({ type: [BlogPostSegmentEntity] })
  data: (BlogPostSegmentEntity | null)[];

  @ApiProperty({ type: [ListResponseMetaEntity] })
  meta: ListResponseMetaEntity;

  constructor(response: WithoutEntityType<BlogPostListResponseEntity>) {
    super();

    this.data = response.data;
    this.meta = response.meta;
  }
}

export class BlogPostResponseEntity extends Entity implements BlogPostResponse {
  @ApiProperty({ type: BlogPostEntity })
  data: BlogPostEntity;

  constructor(response: WithoutEntityType<BlogPostResponseEntity>) {
    super();

    this.data = response.data;
  }
}
