// global modules
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

import type {
  ArticleCodeBlock,
  ArticleTextBlock,
  CMSTutorial,
  CMSTutorialTranslations,
  CodeBlockVariant,
} from '@repo/api-models';

// common modules
import { IsNullable } from 'src/utils/dto';

class CodeBlockVariantDTO implements CodeBlockVariant {
  @IsString()
  @IsNullable()
  @ApiProperty({ type: String })
  filename!: string | null;

  @IsString()
  @IsNullable()
  @ApiProperty({ type: String })
  label!: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  language!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  text!: string;
}

type ArticleCodeBlockContent = ArticleCodeBlock['content'];
class ArticleCodeBlockContentDTO implements ArticleCodeBlockContent {
  @IsArray()
  @ValidateNested()
  @Type(() => CodeBlockVariantDTO)
  @ApiProperty({ type: [CodeBlockVariantDTO] })
  variants!: CodeBlockVariantDTO[];
}

class ArticleCodeBlockDTO implements ArticleCodeBlock {
  @ValidateNested()
  @Type(() => ArticleCodeBlockContentDTO)
  @ApiProperty({ type: ArticleCodeBlockContentDTO })
  content!: ArticleCodeBlockContentDTO;

  @IsInt()
  @ApiProperty({ type: Number })
  order!: number;

  @IsString()
  @IsNullable()
  @ApiProperty({ nullable: true, type: String })
  subtitle!: string | null;

  @IsString()
  @IsNullable()
  @ApiProperty({ nullable: true, type: String })
  title!: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  type!: 'code';
}

class ArticleTextBlockContentDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  type!: 'md' | 'html';

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  text!: string;
}

class ArticleTextBlockDTO implements ArticleTextBlock {
  @ValidateNested()
  @Type(() => ArticleTextBlockContentDTO)
  content!: ArticleTextBlockContentDTO;

  @IsInt()
  @ApiProperty({ type: Number })
  order!: number;

  @IsString()
  @IsNullable()
  @ApiProperty({ type: String })
  subtitle!: string | null;

  @IsString()
  @IsNullable()
  @ApiProperty({ type: String })
  title!: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  type!: 'text';
}

class UpdateCMSTutorialTranslationDTO implements CMSTutorialTranslations {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  language_code!: string;

  @IsString()
  @ApiProperty({ type: String })
  seo_description!: string;

  @IsString()
  @ApiProperty({ type: String })
  seo_keywords!: string;

  @IsString()
  @ApiProperty({ type: String })
  seo_title!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  short_description!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  title!: string;

  @ValidateNested({ each: true })
  @Type(() => Object, {
    discriminator: {
      property: 'type',
      subTypes: [
        { name: 'text', value: ArticleTextBlockDTO },
        { name: 'code', value: ArticleCodeBlockDTO },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  blocks!: Array<ArticleTextBlockDTO | ArticleTextBlockDTO>;
}

export class UpdateCMSTutorialDTO implements CMSTutorial {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => UpdateCMSTutorialTranslationDTO)
  @ApiProperty({ type: [UpdateCMSTutorialTranslationDTO] })
  translations!: UpdateCMSTutorialTranslationDTO[];
}
