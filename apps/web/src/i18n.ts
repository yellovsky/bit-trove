// global modules
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// local modules
import { SUPPORTED_LOCALES } from '~/constants';

const requestConfig = getRequestConfig(async ({ locale }) => {
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

// TODO: The inferred type of 'requestConfig' cannot be named without a reference to getRequestConfig
export default requestConfig as unknown;
