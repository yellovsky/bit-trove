export interface ItemResponse<TData> {
  data: TData;
}

export interface ListResponseMetaPagination {
  limit: number;
  offset: number;
  total: number;
}

export interface ListResponseMeta {
  pagination: ListResponseMetaPagination;
}

export interface WithListResponseMeta {
  meta: ListResponseMeta;
}
export interface ListResponse<TData> extends WithListResponseMeta {
  data: Array<TData | null>;
}

export type ApiErrorName =
  | 'bad_request'
  | 'forbidden'
  | 'internal_server_error'
  | 'not_found'
  | 'unauthorized';

export interface ResponseError {
  status_code: number;
  error_name: ApiErrorName;
  message?: string;
  invalid_params?: Array<{ name: string; reason: string }>;
}

export interface FailedResponse {
  error: ResponseError;
  meta: { status: number };
}

export interface PaginationFP {
  offset: number;
  limit: number;
}

export type SortWithDirection<TSort extends string> = TSort | `-${TSort}`;
export type SortWithoutDirection<TWithDirection extends SortWithDirection<string>> =
  TWithDirection extends SortWithDirection<infer TField> ? TField : never;
