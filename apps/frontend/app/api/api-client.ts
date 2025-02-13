// global modules
import { Effect } from 'effect';
import EventEmitter from 'eventemitter3';
import type { FailedResponse } from '@repo/api-models';
import { useState } from 'react';

import axios, {
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  isAxiosError,
} from 'axios';

export const isFailedResponse = (response: unknown): response is FailedResponse => {
  return !!response && typeof response === 'object' && 'error' in response;
};

export const UNKNOWN_FAILED_RESPONSE: FailedResponse = {
  error: {
    error_name: 'internal_server_error',
    message: 'An unknown error occurred',
    status_code: 500,
  },
  meta: { status: 500 },
} as const;

export interface ApiClient extends EventEmitter<'access_token_expired'> {
  axios: AxiosInstance;
  updateAuthHeader: (accessToken: string | null) => void;

  get<T = any>(url: string, config?: AxiosRequestConfig<any>): Effect.Effect<T, FailedResponse>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
  ): Effect.Effect<T, FailedResponse>;

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
  ): Effect.Effect<T, FailedResponse>;
}

/**
 * Represents an API client that interacts with the backend server.
 */
class ApiClientClass extends EventEmitter<'access_token_expired'> implements ApiClient {
  axios: AxiosInstance;

  static getApiHost() {
    try {
      return process.env.API_HOST;
    } catch {
      return typeof window === undefined ? undefined : window.ENV?.API_HOST;
    }
  }

  constructor() {
    super();

    this.axios = axios.create({ baseURL: `${ApiClientClass.getApiHost()}/api` });
  }

  /**
   * Updates the Authorization header with the provided access token.
   * @param accessToken - The access token to be set in the Authorization header.
   */
  updateAuthHeader = (accessToken: string | null) => {
    if (!accessToken) delete this.axios.defaults.headers.common.Authorization;
    else this.axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  get<T = any>(url: string, config?: AxiosRequestConfig<any>): Effect.Effect<T, FailedResponse> {
    return Effect.tryPromise({
      catch: error => {
        return isAxiosError(error) && isFailedResponse(error.response?.data)
          ? error.response.data
          : UNKNOWN_FAILED_RESPONSE;
      },
      try: () =>
        this.axios.get<T, AxiosResponse<T, any>>(url, config).then(response => response.data),
    });
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
  ): Effect.Effect<T, FailedResponse> {
    return Effect.tryPromise({
      catch: error =>
        isAxiosError(error) && isFailedResponse(error.response?.data)
          ? error.response.data
          : UNKNOWN_FAILED_RESPONSE,
      try: () =>
        this.axios
          .post<T, AxiosResponse<T, any>>(url, data, config)
          .then(response => response.data),
    });
  }

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
  ): Effect.Effect<T, FailedResponse> {
    return Effect.tryPromise({
      catch: error =>
        isAxiosError(error) && isFailedResponse(error.response?.data)
          ? error.response.data
          : UNKNOWN_FAILED_RESPONSE,
      try: () =>
        this.axios.put<T, AxiosResponse<T, any>>(url, data, config).then(response => response.data),
    });
  }
}

let cached: ApiClient | undefined;

/**
 * Returns an instance of the ApiClient.
 * If running in a browser environment, it checks if the client is already cached.
 * If not cached, it creates a new instance and updates the authentication header.
 * @returns The ApiClient instance.
 */
export const getApiClient = (): ApiClient => {
  if (typeof window === 'undefined') return new ApiClientClass();
  if (!cached) cached = new ApiClientClass();
  return cached;
};

/**
 * Custom hook that returns the API client instance.
 * If the client is already cached, it returns the cached instance.
 * Otherwise, it creates a new instance using the getApiClient function.
 *
 * @returns The API client instance.
 */
export const useApiClient = () => {
  const [apiClient] = useState(() => cached || getApiClient());
  return apiClient;
};

/**
 * Creates a mock success Axios response object.
 *
 * @template TResponse - The type of the response data.
 * @param data - The response data.
 * @returns The mock success Axios response object.
 */
export const mockSuccessAxiosResponse = <TResponse>(data: TResponse) =>
  ({
    config: { headers: new AxiosHeaders() },
    data,
    headers: {},
    status: 200,
    statusText: 'OK',
  }) satisfies AxiosResponse<TResponse>;
