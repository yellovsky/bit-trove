// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { GetPermissionPolicyListResponse } from '@repo/api-models';

// common modules
import { ListResponseMetaEntity } from 'src/common/entities/response';

// local modules
import { PermissionPolicyEntity } from './permission-policy.entity';

export class GetPermissionPolicyListResponseEntity
  implements GetPermissionPolicyListResponse
{
  @ApiProperty({ type: [PermissionPolicyEntity] })
  data: GetPermissionPolicyListResponse['data'];

  @ApiProperty({ type: [ListResponseMetaEntity] })
  meta: GetPermissionPolicyListResponse['meta'];

  constructor(response: GetPermissionPolicyListResponseEntity) {
    this.data = response.data.map((policy) =>
      !policy ? null : new PermissionPolicyEntity(policy),
    );
    this.meta = new ListResponseMetaEntity(response.meta);
  }
}
