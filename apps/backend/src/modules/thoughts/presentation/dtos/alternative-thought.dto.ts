import { ApiProperty } from '@nestjs/swagger';

import type { AlternativeThought } from '@repo/api-models';

export class AlternativeThoughtDto implements AlternativeThought {
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

  constructor(data: AlternativeThought) {
    Object.assign(this, data);
  }
}
