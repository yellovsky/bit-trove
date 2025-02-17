// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { TutorialListResponse } from '@repo/api-models';

// common modules
import { ListResponseMetaEntity } from 'src/common/entities/response';

// local modules
import { TutorialShortEntity } from './tutorial-short.entity';

export class TutorialListResponseEntity implements TutorialListResponse {
  @ApiProperty({ type: [TutorialShortEntity] })
  data: TutorialListResponse['data'];

  @ApiProperty({ type: [ListResponseMetaEntity] })
  meta: TutorialListResponse['meta'];

  constructor(response: TutorialListResponseEntity) {
    this.data = response.data.map((tutorial) =>
      !tutorial ? null : new TutorialShortEntity(tutorial),
    );
    this.meta = new ListResponseMetaEntity(response.meta);
  }
}
