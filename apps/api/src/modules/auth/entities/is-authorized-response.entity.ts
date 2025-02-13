// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { IsAuthorizedResponse } from '@repo/api-models';

// common modules
import { Entity, type WithoutEntityType } from 'src/common/entities/entity';

type IsAuthorizedResponseData = IsAuthorizedResponse['data'];
class IsAuthorizedResponseEntityData
  extends Entity
  implements IsAuthorizedResponseData
{
  @ApiProperty({ type: Boolean })
  isAuthorized: IsAuthorizedResponseData['isAuthorized'];

  constructor(response: WithoutEntityType<IsAuthorizedResponseEntityData>) {
    super();

    this.isAuthorized = response.isAuthorized;
  }
}

export class IsAuthorizedResponseEntity
  extends Entity
  implements IsAuthorizedResponse
{
  @ApiProperty({ type: String })
  data: IsAuthorizedResponse['data'];

  constructor(isAuthorized: boolean) {
    super();

    this.data = new IsAuthorizedResponseEntityData({ isAuthorized });
  }
}
