// global modules
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

import type {
  ArticleCodeBlock,
  ArticleImageBlock,
  ArticleTextBlock,
  BlogPost,
  BlogPostListResponse,
  BlogPostResponse,
  BlogPostSegment,
} from '@repo/api-models';

// common modules
import { ListResponseMetaEntity } from 'src/entities/response';
import { Entity, type WithoutEntityType } from 'src/entities/entity';

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

  constructor(data: WithoutEntityType<BlogPostSegmentEntity>) {
    super();

    this.created_at = data.created_at;
    this.id = data.id;
    this.original_language_code = data.original_language_code;
    this.published_at = data.published_at;
    this.short_description = data.short_description;
    this.slug = data.slug;
    this.title = data.title;
  }
}

export class ArticleImageBlockContentEntity extends Entity {
  @ApiProperty({ type: String })
  url: string;

  constructor(data: WithoutEntityType<ArticleImageBlockContentEntity>) {
    super();

    this.url = data.url;
  }
}

export class ArticleImageBlockEntity
  extends Entity
  implements ArticleImageBlock
{
  @ApiProperty({ type: ArticleImageBlockContentEntity })
  content: ArticleImageBlockContentEntity;

  @ApiProperty({ type: Number })
  order: number;

  @ApiProperty({ enum: ['image'] })
  type: 'image' = 'image';

  constructor(data: WithoutEntityType<ArticleImageBlockEntity>) {
    super();

    this.content = data.content;
    this.order = data.order;
  }
}

export class ArticleTextBlockMDContentEntity extends Entity {
  @ApiProperty({ type: String })
  md: string;

  constructor(data: WithoutEntityType<ArticleTextBlockMDContentEntity>) {
    super();
    this.md = data.md;
  }
}

export class ArticleTextBlockHTMLContentEntity extends Entity {
  @ApiProperty({ type: String })
  html: string;

  constructor(data: WithoutEntityType<ArticleTextBlockHTMLContentEntity>) {
    super();
    this.html = data.html;
  }
}

export class ArticleTextBlockEntity extends Entity implements ArticleTextBlock {
  @ApiProperty({
    isArray: true,
    oneOf: [
      { $ref: getSchemaPath(ArticleTextBlockMDContentEntity) },
      { $ref: getSchemaPath(ArticleTextBlockHTMLContentEntity) },
    ],
  })
  content: ArticleTextBlockMDContentEntity | ArticleTextBlockHTMLContentEntity;

  @ApiProperty({ type: Number })
  order: number;

  @ApiProperty({ enum: ['text'] })
  type: 'text' = 'text';

  constructor(data: WithoutEntityType<ArticleTextBlockEntity>) {
    super();

    this.content = data.content;
    this.order = data.order;
  }
}

export class ArticleCodeBlockVariantEntity extends Entity {
  @ApiProperty({ type: String })
  language: string;

  @ApiProperty({ type: String })
  text: string;

  constructor(data: WithoutEntityType<ArticleCodeBlockVariantEntity>) {
    super();

    this.language = data.language;
    this.text = data.text;
  }
}

export class ArticleCodeBlockContentEntity extends Entity {
  @ApiProperty({ type: [ArticleCodeBlockVariantEntity] })
  variants: ArticleCodeBlockVariantEntity[];

  constructor(data: WithoutEntityType<ArticleCodeBlockContentEntity>) {
    super();

    this.variants = data.variants;
  }
}

export class ArticleCodeBlockEntity extends Entity implements ArticleCodeBlock {
  @ApiProperty({ type: ArticleCodeBlockContentEntity })
  content: ArticleCodeBlockContentEntity;

  @ApiProperty({ type: Number })
  order: number;

  @ApiProperty({ enum: ['code'] })
  type: 'code' = 'code';

  constructor(data: WithoutEntityType<ArticleCodeBlockEntity>) {
    super();

    this.content = data.content;
    this.order = data.order;
  }
}

export type ArticleBlockEntity =
  | ArticleCodeBlockEntity
  | ArticleTextBlockEntity
  | ArticleImageBlockEntity;

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
