// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { PermissionPolicy } from '@repo/api-models';

export class PermissionPolicyEntity implements PermissionPolicy {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  act: string | null;

  @ApiProperty({ type: String })
  cond: string | null;

  @ApiProperty({ type: String })
  obj_type: string | null;

  @ApiProperty({ type: String })
  sub: string | null;

  @ApiProperty({ type: String })
  created_at: string;

  @ApiProperty({ nullable: true, type: String })
  note: string | null;

  constructor(data: PermissionPolicyEntity) {
    this.id = data.id;
    this.act = data.act;
    this.cond = data.cond;
    this.obj_type = data.obj_type;
    this.sub = data.sub;
    this.note = data.note;
    this.created_at = data.created_at;
  }
}
