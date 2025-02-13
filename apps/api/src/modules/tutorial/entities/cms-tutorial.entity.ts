// global modules
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import type { CMSTutorial, CMSTutorialTranslations } from '@repo/api-models';

// common modules
import { Entity, type WithoutEntityType } from 'src/common/entities/entity';

// local modules
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
export class CMSTutorialTranslationsEntity
  extends Entity
  implements CMSTutorialTranslations
{
  @ApiProperty({ type: String })
  language_code: string;

  @ApiProperty({ nullable: true, type: String })
  seo_title: string;

  @ApiProperty({ nullable: true, type: String })
  seo_keywords: string;

  @ApiProperty({ nullable: true, type: String })
  seo_description: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  short_description: string;

  @ApiProperty({
    isArray: true,

    oneOf: [
      { $ref: getSchemaPath(ArticleCodeBlockEntity) },
      { $ref: getSchemaPath(ArticleTextBlockEntity) },
      { $ref: getSchemaPath(ArticleImageBlockEntity) },
    ],
  })
  blocks: ArticleBlockEntity[];

  constructor(data: WithoutEntityType<CMSTutorialTranslationsEntity>) {
    super();

    this.language_code = data.language_code;
    this.seo_title = data.seo_title;
    this.seo_keywords = data.seo_keywords;
    this.seo_description = data.seo_description;
    this.blocks = data.blocks;
    this.title = data.title;
    this.short_description = data.short_description;
  }
}

export class CMSTutorialEntity extends Entity implements CMSTutorial {
  @ApiProperty({ type: [CMSTutorialTranslationsEntity] })
  translations: CMSTutorialTranslationsEntity[];

  constructor(data: WithoutEntityType<CMSTutorialEntity>) {
    super();

    this.translations = data.translations;
  }
}
