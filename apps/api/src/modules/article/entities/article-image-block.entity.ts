// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { ArticleImageBlock } from '@repo/api-models';

// common modules
import { Entity, type WithoutEntityType } from 'src/common/entities/entity';

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

  @ApiProperty({ enum: ['image'] })
  type: 'image' = 'image';

  @ApiProperty({ nullable: true, type: String })
  title: string | null;

  @ApiProperty({ nullable: true, type: String })
  subtitle: string | null;

  constructor(data: WithoutEntityType<ArticleImageBlockEntity>) {
    super();

    this.content = data.content;
    this.title = data.title;
    this.subtitle = data.subtitle;
  }
}
