// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { PermissionPolicyListResponse } from '@repo/api-models';

// common modules
import { ListResponseMetaEntity } from 'src/common/entities/response';

// local modules
import { PermissionPolicyEntity } from './permission-policy.entity';

export class PermissionPolicyListResponseEntity
  implements PermissionPolicyListResponse
{
  @ApiProperty({ type: [PermissionPolicyEntity] })
  data: PermissionPolicyListResponse['data'];

  @ApiProperty({ type: [ListResponseMetaEntity] })
  meta: PermissionPolicyListResponse['meta'];

  constructor(response: PermissionPolicyListResponseEntity) {
    this.data = response.data.map((policy) =>
      !policy ? null : new PermissionPolicyEntity(policy),
    );
    this.meta = new ListResponseMetaEntity(response.meta);
  }
}
