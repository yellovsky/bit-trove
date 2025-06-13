import { ApiProperty } from '@nestjs/swagger';

import type { GetOneShardResponse } from '@repo/api-models';

import type { LocalizedShardModel } from '../../domain/models/localized-shard.model';
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

  static fromModel(model: LocalizedShardModel): GetOneShardResponseDto {
    return new GetOneShardResponseDto({ data: ShardDto.fromModel(model) });
  }

  constructor(data: Omit<GetOneShardResponse, 'status'>) {
    Object.assign(this, data);
  }
}
