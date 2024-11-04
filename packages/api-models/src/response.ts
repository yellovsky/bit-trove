export interface ItemResponse<TData> {
  data: TData;
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
  invalid_params?: [{ name: string; reason: string }];
}

export interface FailedResponse {
  errors: ResponseError[];
  meta: { status: number };
}
