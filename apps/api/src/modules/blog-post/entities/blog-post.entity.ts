// global modules
import type { BlogPost } from '@repo/api-models';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

// common modules
import { BlogPostShortEntity } from './blog-post-short.entity';

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
export class BlogPostEntity extends BlogPostShortEntity implements BlogPost {
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

  constructor(data: BlogPostEntity) {
    super(data);

    this.blocks = data.blocks;
    this.seo_description = data.seo_description;
    this.seo_keywords = data.seo_keywords;
    this.seo_title = data.seo_title;
  }
}
