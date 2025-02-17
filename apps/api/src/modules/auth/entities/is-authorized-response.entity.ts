// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { IsAuthorizedResponse } from '@repo/api-models';

type IsAuthorizedResponseData = IsAuthorizedResponse['data'];
class IsAuthorizedResponseEntityData implements IsAuthorizedResponseData {
  @ApiProperty({ type: Boolean })
  isAuthorized: IsAuthorizedResponseData['isAuthorized'];

  constructor(response: IsAuthorizedResponseEntityData) {
    this.isAuthorized = response.isAuthorized;
  }
}

export class IsAuthorizedResponseEntity implements IsAuthorizedResponse {
  @ApiProperty({ type: String })
  data: IsAuthorizedResponse['data'];

  constructor(isAuthorized: boolean) {
    this.data = new IsAuthorizedResponseEntityData({ isAuthorized });
  }
}
