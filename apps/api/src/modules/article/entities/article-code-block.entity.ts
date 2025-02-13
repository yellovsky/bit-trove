// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { ArticleCodeBlock, CodeBlockVariant } from '@repo/api-models';

// common modules
import { Entity, type WithoutEntityType } from 'src/common/entities/entity';

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
