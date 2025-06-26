import { ApiProperty } from '@nestjs/swagger';
import { Effect } from 'effect';

import type { Author } from '@repo/api-models';

import type { ExclusionReason } from '../excluded';
import type { AuthorModel } from '../models/author.model';

export class AuthorDto implements Author {
  @ApiProperty({
    description: 'The ID of the author',
    type: String,
  })
  readonly id!: string;

  @ApiProperty({
    description: 'The name of the author',
    type: String,
  })
  readonly name!: string;

  static fromModel(model: AuthorModel): Effect.Effect<AuthorDto, ExclusionReason> {
    return Effect.succeed(new AuthorDto({ id: model.id, name: model.name }));
  }

  constructor(data: Author) {
    Object.assign(this, data);
  }
}
