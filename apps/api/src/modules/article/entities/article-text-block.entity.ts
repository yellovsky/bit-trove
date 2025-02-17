// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { ArticleTextBlock } from '@repo/api-models';

export class ArticleTextBlockContentEntity {
  @ApiProperty({ type: String })
  type: 'md' | 'html';

  @ApiProperty({ type: String })
  text: string;

  constructor(data: ArticleTextBlockContentEntity) {
    this.type = data.type;
    this.text = data.text;
  }
}

export class ArticleTextBlockEntity implements ArticleTextBlock {
  @ApiProperty({ isArray: true, type: ArticleTextBlockContentEntity })
  content: ArticleTextBlock['content'];

  @ApiProperty({ enum: ['text'] })
  type: 'text' = 'text';

  @ApiProperty({ nullable: true, type: String })
  title: string | null;

  @ApiProperty({ nullable: true, type: String })
  subtitle: string | null;

  constructor(data: ArticleTextBlockEntity) {
    this.content = data.content;
    this.title = data.title;
    this.subtitle = data.subtitle;
  }
}
