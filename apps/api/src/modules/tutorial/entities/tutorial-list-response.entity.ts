// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { TutorialListResponse } from '@repo/api-models';

// common modules
import { ListResponseMetaEntity } from 'src/common/entities/response';
import { Entity, type WithoutEntityType } from 'src/common/entities/entity';

// local modules
import { TutorialSegmentEntity } from './tutorial-segment.entity';

export class TutorialListResponseEntity
  extends Entity
  implements TutorialListResponse
{
  @ApiProperty({ type: [TutorialSegmentEntity] })
  data: (TutorialSegmentEntity | null)[];

  @ApiProperty({ type: [ListResponseMetaEntity] })
  meta: ListResponseMetaEntity;

  constructor(response: WithoutEntityType<TutorialListResponseEntity>) {
    super();

    this.data = response.data;
    this.meta = response.meta;
  }
}
