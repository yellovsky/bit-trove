// global modules
import type { BlogPost } from '@repo/api-models';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

// common modules
import { BlogPostSegmentEntity } from './blog-post-segment.entity';
import type { WithoutEntityType } from 'src/common/entities/entity';

import {
  type ArticleBlockEntity,
  ArticleCodeBlockEntity,
  ArticleImageBlockEntity,
  ArticleTextBlockEntity,
} from 'src/modules/article';

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
