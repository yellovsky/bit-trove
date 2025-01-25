// global modules
import type { ResponseError } from '@repo/api-models';
import type { TFunction } from 'i18next';

export const translateApiError = (t: TFunction<'zod'>, apiError: ResponseError): string => {
  return t(apiError.error_name);
};
