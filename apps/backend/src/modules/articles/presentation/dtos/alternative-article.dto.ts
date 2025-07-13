import { ApiProperty } from '@nestjs/swagger';

import type { AlternativeArticle } from '@repo/api-models';

export class AlternativeArticleDto implements AlternativeArticle {
  @ApiProperty({
    description: 'The ID of the article alternative',
    type: String,
  })
  readonly id!: string;

  @ApiProperty({
    description: 'The language code of the article alternative',
    type: String,
  })
  readonly languageCode!: string;

  @ApiProperty({
    description: 'The slug of the article alternative',
    type: String,
  })
  readonly slug!: string;

  constructor(data: AlternativeArticle) {
    Object.assign(this, data);
  }
}
