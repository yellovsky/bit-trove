// global modules
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import type { ArticleBlock, Tutorial } from '@repo/api-models';

// common modules
import {
  type ArticleBlockEntity,
  ArticleCodeBlockEntity,
  ArticleImageBlockEntity,
  ArticleTextBlockEntity,
} from 'src/modules/article';

// local modules
import { TutorialShortEntity } from './tutorial-short.entity';

const makeBlockEntity = (block: ArticleBlock): ArticleBlockEntity | null => {
  switch (block.type) {
    case 'code':
      return new ArticleCodeBlockEntity(block);

    case 'text':
      return new ArticleTextBlockEntity(block);

    case 'image':
      return new ArticleImageBlockEntity(block);

    default:
      return null;
  }
};

@ApiExtraModels(
  ArticleCodeBlockEntity,
  ArticleTextBlockEntity,
  ArticleImageBlockEntity,
)
export class TutorialEntity extends TutorialShortEntity implements Tutorial {
  @ApiProperty({
    isArray: true,

    oneOf: [
      { $ref: getSchemaPath(ArticleCodeBlockEntity) },
      { $ref: getSchemaPath(ArticleTextBlockEntity) },
      { $ref: getSchemaPath(ArticleImageBlockEntity) },
    ],
  })
  blocks: ArticleBlock[];

  @ApiProperty({ nullable: true, type: String })
  seo_description: string;

  @ApiProperty({ nullable: true, type: String })
  seo_keywords: string;

  @ApiProperty({ nullable: true, type: String })
  seo_title: string;

  constructor(data: TutorialEntity) {
    super(data);

    this.blocks = data.blocks.map(makeBlockEntity).filter((v) => !!v);
    this.seo_description = data.seo_description;
    this.seo_keywords = data.seo_keywords;
    this.seo_title = data.seo_title;
  }
}
