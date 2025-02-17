// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { ArticleImageBlock } from '@repo/api-models';

export class ArticleImageBlockContentEntity {
  @ApiProperty({ type: String })
  url: string;

  constructor(data: ArticleImageBlockContentEntity) {
    this.url = data.url;
  }
}

export class ArticleImageBlockEntity implements ArticleImageBlock {
  @ApiProperty({ type: ArticleImageBlockContentEntity })
  content: ArticleImageBlock['content'];

  @ApiProperty({ enum: ['image'] })
  type: 'image' = 'image';

  @ApiProperty({ nullable: true, type: String })
  title: string | null;

  @ApiProperty({ nullable: true, type: String })
  subtitle: string | null;

  constructor(data: ArticleImageBlockEntity) {
    this.content = data.content;
    this.title = data.title;
    this.subtitle = data.subtitle;
  }
}
