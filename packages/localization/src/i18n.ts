// global modules
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// local modules
import { locales } from './config';

type RequestConfig = ReturnType<typeof getRequestConfig>;

export const requestConfig: RequestConfig = getRequestConfig(async ({ locale }) => {
  if (!locales.some((l) => l === locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
