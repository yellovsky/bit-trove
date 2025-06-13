import { ApiProperty } from '@nestjs/swagger';

import type { AlternativeShard } from '@repo/api-models';

export class AlternativeShardDto implements AlternativeShard {
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

  constructor(data: AlternativeShard) {
    Object.assign(this, data);
  }
}
