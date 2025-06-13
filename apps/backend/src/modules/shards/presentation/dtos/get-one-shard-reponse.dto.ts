import { ApiProperty } from '@nestjs/swagger';
import { Effect } from 'effect';

import type { GetOneShardResponse } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';

import type { ShardModel } from '../../domain/models/shard.model';
import { ShardDto } from './shard.dto';

export class GetOneShardResponseDto implements GetOneShardResponse {
  @ApiProperty({
    description: 'The status of the response',
    type: String,
  })
  readonly status: 'success' = 'success' as const;

  @ApiProperty({
    description: 'The data of the response',
  })
  readonly data!: ShardDto;

  static fromModel(model: ShardModel): Effect.Effect<GetOneShardResponseDto, ExclusionReason> {
    return ShardDto.fromModel(model).pipe(Effect.map((data) => new GetOneShardResponseDto({ data })));
  }

  constructor(data: Omit<GetOneShardResponse, 'status'>) {
    Object.assign(this, data);
  }
}
