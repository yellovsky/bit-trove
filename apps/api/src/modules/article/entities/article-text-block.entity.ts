// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { ArticleTextBlock } from '@repo/api-models';

// common modules
import { Entity, type WithoutEntityType } from 'src/common/entities/entity';

export class ArticleTextBlockContentEntity extends Entity {
  @ApiProperty({ type: String })
  type: 'md' | 'html';

  @ApiProperty({ type: String })
  text: string;

  constructor(data: WithoutEntityType<ArticleTextBlockContentEntity>) {
    super();
    this.type = data.type;
    this.text = data.text;
  }
}

export class ArticleTextBlockEntity extends Entity implements ArticleTextBlock {
  @ApiProperty({ isArray: true, type: ArticleTextBlockContentEntity })
  content: ArticleTextBlockContentEntity;

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
