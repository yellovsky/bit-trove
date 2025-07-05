import { ApiProperty } from '@nestjs/swagger';

import type { AlternativeBlogPost } from '@repo/api-models';

export class AlternativeBlogPostDto implements AlternativeBlogPost {
  @ApiProperty({
    description: 'The ID of the blog post alternative',
    type: String,
  })
  readonly id!: string;

  @ApiProperty({
    description: 'The language code of the blog post alternative',
    type: String,
  })
  readonly languageCode!: string;

  @ApiProperty({
    description: 'The slug of the blog post alternative',
    type: String,
  })
  readonly slug!: string;

  constructor(data: AlternativeBlogPost) {
    Object.assign(this, data);
  }
}
