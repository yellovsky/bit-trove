// global modules
import type { Tutorial } from '@repo/api-models';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

// common modules
import { type WithoutEntityType } from 'src/common/entities/entity';

import {
  type ArticleBlockEntity,
  ArticleCodeBlockEntity,
  ArticleImageBlockEntity,
  ArticleTextBlockEntity,
} from 'src/modules/article';

// local modules
import { TutorialSegmentEntity } from './tutorial-segment.entity';

@ApiExtraModels(
  ArticleCodeBlockEntity,
  ArticleTextBlockEntity,
  ArticleImageBlockEntity,
)
export class TutorialEntity extends TutorialSegmentEntity implements Tutorial {
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
  seo_description: string;

  @ApiProperty({ nullable: true, type: String })
  seo_keywords: string;

  @ApiProperty({ nullable: true, type: String })
  seo_title: string;

  constructor(data: WithoutEntityType<TutorialEntity>) {
    super(data);

    this.blocks = data.blocks;
    this.seo_description = data.seo_description;
    this.seo_keywords = data.seo_keywords;
    this.seo_title = data.seo_title;
  }
}
