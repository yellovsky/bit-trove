// global modules
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

import type {
  ArticleCodeBlock,
  ArticleImageBlock,
  ArticleTextBlock,
  CodeBlockVariant,
} from '@repo/api-models';

// common modules
import { Entity, type WithoutEntityType } from 'src/entities/entity';

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

  @ApiProperty({ nullable: true, type: String })
  title: string | null;

  @ApiProperty({ nullable: true, type: String })
  subtitle: string | null;

  constructor(data: WithoutEntityType<ArticleImageBlockEntity>) {
    super();

    this.content = data.content;
    this.order = data.order;
    this.title = data.title;
    this.subtitle = data.subtitle;
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

  @ApiProperty({ nullable: true, type: String })
  title: string | null;

  @ApiProperty({ nullable: true, type: String })
  subtitle: string | null;

  constructor(data: WithoutEntityType<ArticleTextBlockEntity>) {
    super();

    this.content = data.content;
    this.order = data.order;
    this.title = data.title;
    this.subtitle = data.subtitle;
  }
}

export class ArticleCodeBlockVariantEntity
  extends Entity
  implements CodeBlockVariant
{
  @ApiProperty({ type: String })
  language: string;

  @ApiProperty({ type: String })
  text: string;

  @ApiProperty({ nullable: true, type: String })
  filename: string | null;

  @ApiProperty({ nullable: true, type: String })
  label: string | null;

  constructor(data: WithoutEntityType<ArticleCodeBlockVariantEntity>) {
    super();

    this.language = data.language;
    this.text = data.text;
    this.filename = data.filename;
    this.label = data.label;
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

  @ApiProperty({ nullable: true, type: String })
  title: string | null;

  @ApiProperty({ nullable: true, type: String })
  subtitle: string | null;

  constructor(data: WithoutEntityType<ArticleCodeBlockEntity>) {
    super();

    this.content = data.content;
    this.order = data.order;
    this.title = data.title;
    this.subtitle = data.subtitle;
  }
}

export type ArticleBlockEntity =
  | ArticleCodeBlockEntity
  | ArticleTextBlockEntity
  | ArticleImageBlockEntity;
