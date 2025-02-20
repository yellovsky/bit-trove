// local modules
import type { ItemResponse, ListResponse, PaginationFP } from './response';

export interface PermissionPolicy {
  id: string;
  sub: string | null;
  act: string | null;
  obj_type: string | null;
  cond: string | null;
  note: string | null;
  created_at: string;
}

export type GetPermissionPolicyResponse = ItemResponse<PermissionPolicy>;
export type GetPermissionPolicyListResponse = ListResponse<PermissionPolicy>;

export interface GetPermissionPolicyListFP {
  page: PaginationFP;
  sort: 'created_at' | '-created_at';
}

export type UpsertPermissionPolicyFP = Omit<PermissionPolicy, 'id' | 'created_at'>;
