import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';

import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';

import { CheckThoughtSlugAvailabilityUseCase } from '../application/use-cases/check-thought-slug-availability.use-case';
import { CreateThoughtUseCase } from '../application/use-cases/create-thought.use-case';
import {
  CheckThoughtSlugAvailabilityResponseDto,
  ThoughtSlugAvailabilityDto,
} from './dtos/thought-slug-availability-response.dto';

@ApiTags('Thoughts')
@Controller({ path: 'thought-slug-availability', version: '1' })
export class ThoughtSlugAvailabilityController {
  constructor(
    @Inject(CreateThoughtUseCase)
    private readonly createThoughtUseCase: CreateThoughtUseCase,

    @Inject(CheckThoughtSlugAvailabilityUseCase)
    private readonly checkThoughtSlugAvailabilityUseCase: CheckThoughtSlugAvailabilityUseCase
  ) {}

  @Get(':slug')
  @ApiOperation({ summary: 'Check if a thought slug is available' })
  @ApiResponse({ description: 'Returns the availability of the thought slug', status: 200 })
  async check(
    @ReqCtx() reqCtx: RequestContext,
    @Param('slug') slug: string
  ): Promise<CheckThoughtSlugAvailabilityResponseDto> {
    const pipeline: Effect.Effect<CheckThoughtSlugAvailabilityResponseDto, ExclusionReason> =
      this.checkThoughtSlugAvailabilityUseCase.execute(reqCtx, slug).pipe(
        Effect.map((available) => {
          return new CheckThoughtSlugAvailabilityResponseDto({ data: new ThoughtSlugAvailabilityDto({ available }) });
        }),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
