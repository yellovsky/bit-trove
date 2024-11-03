export interface ItemResponse<TData> {
  data: TData;
}

export interface ResponseError {
  status: number;
  code: string;
  message: string;
}

export interface FailedResponse {
  errors: ResponseError[];
  meta: { status: number };
}
