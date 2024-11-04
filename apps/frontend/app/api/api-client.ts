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

// common modules
import { BrowserCookieManager } from '~/utils/cookie-manager/cookie-manager.browser';

const isFailedResponse = (response: unknown): response is FailedResponse => {
  return !!response && typeof response === 'object' && 'errors' in response;
};

const UNKNOWN_FAILED_RESPONSE: FailedResponse = {
  errors: [
    { error_name: 'internal_server_error', message: 'An unknown error occurred', status_code: 500 },
  ],
  meta: { status: 500 },
} as const;

export interface ApiClient extends EventEmitter<'access_token_expired'> {
  axios: AxiosInstance;
  updateAuthHeader: (accessToken: string | null) => void;

  get<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Effect.Effect<T, FailedResponse>;
}

/**
 * Represents an API client that interacts with the backend server.
 */
class ApiClientClass extends EventEmitter<'access_token_expired'> implements ApiClient {
  axios: AxiosInstance;

  constructor() {
    super();

    this.axios = axios.create({ baseURL: `${process.env.API_HOST}/api` });
  }

  /**
   * Updates the Authorization header with the provided access token.
   * @param accessToken - The access token to be set in the Authorization header.
   */
  updateAuthHeader = (accessToken: string | null) => {
    if (!accessToken) delete this.axios.defaults.headers.common.Authorization;
    else this.axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  get<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Effect.Effect<R, FailedResponse> {
    return Effect.tryPromise({
      catch: error =>
        isAxiosError(error) && isFailedResponse(error.response?.data)
          ? error.response.data
          : UNKNOWN_FAILED_RESPONSE,
      try: () => this.axios.get<T, R>(url, config),
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
  if (!cached) {
    const cookieManager = new BrowserCookieManager();
    cached = new ApiClientClass();
    cached.updateAuthHeader(cookieManager.getCookie('access_token'));
    cookieManager.dispose();
  }
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
