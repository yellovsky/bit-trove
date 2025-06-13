import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';

import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';

import { CheckShardSlugAvailabilityUseCase } from '../application/use-cases/check-shard-slug-availability.use-case';
import { CreateShardUseCase } from '../application/use-cases/create-shard.use-case';
import {
  CheckShardSlugAvailabilityResponseDto,
  ShardSlugAvailabilityDto,
} from './dtos/shard-slug-availability-response.dto';

@ApiTags('Shards')
@Controller({ path: 'shard-slug-availability', version: '1' })
export class ShardSlugAvailabilityController {
  constructor(
    @Inject(CreateShardUseCase)
    private readonly createShardUseCase: CreateShardUseCase,

    @Inject(CheckShardSlugAvailabilityUseCase)
    private readonly checkShardSlugAvailabilityUseCase: CheckShardSlugAvailabilityUseCase
  ) {}

  @Get(':slug')
  @ApiOperation({ summary: 'Check if a shard slug is available' })
  @ApiResponse({ description: 'Returns the availability of the shard slug', status: 200 })
  async check(
    @ReqCtx() reqCtx: RequestContext,
    @Param('slug') slug: string
  ): Promise<CheckShardSlugAvailabilityResponseDto> {
    const pipeline: Effect.Effect<CheckShardSlugAvailabilityResponseDto, ExclusionReason> =
      this.checkShardSlugAvailabilityUseCase.execute(reqCtx, slug).pipe(
        Effect.map((available) => {
          return new CheckShardSlugAvailabilityResponseDto({ data: new ShardSlugAvailabilityDto({ available }) });
        }),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
