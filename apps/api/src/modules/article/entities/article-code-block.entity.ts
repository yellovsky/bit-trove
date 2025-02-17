// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { ArticleCodeBlock, CodeBlockVariant } from '@repo/api-models';

export class ArticleCodeBlockVariantEntity implements CodeBlockVariant {
  @ApiProperty({ type: String })
  language: string;

  @ApiProperty({ type: String })
  text: string;

  @ApiProperty({ nullable: true, type: String })
  filename: string | null;

  @ApiProperty({ nullable: true, type: String })
  label: string | null;

  constructor(data: ArticleCodeBlockVariantEntity) {
    this.language = data.language;
    this.text = data.text;
    this.filename = data.filename;
    this.label = data.label;
  }
}

export class ArticleCodeBlockContentEntity {
  @ApiProperty({ type: [ArticleCodeBlockVariantEntity] })
  variants: ArticleCodeBlockVariantEntity[];

  constructor(data: ArticleCodeBlockContentEntity) {
    this.variants = data.variants;
  }
}

export class ArticleCodeBlockEntity implements ArticleCodeBlock {
  @ApiProperty({ type: ArticleCodeBlockContentEntity })
  content: ArticleCodeBlock['content'];

  @ApiProperty({ enum: ['code'] })
  type: 'code' = 'code';

  @ApiProperty({ nullable: true, type: String })
  title: string | null;

  @ApiProperty({ nullable: true, type: String })
  subtitle: string | null;

  constructor(data: ArticleCodeBlockEntity) {
    this.content = data.content;
    this.title = data.title;
    this.subtitle = data.subtitle;
  }
}
