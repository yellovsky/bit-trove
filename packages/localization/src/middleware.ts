// global modules
import createIntlMiddleware from 'next-intl/middleware';

// local modules
import { defaultLocale, localePrefix, locales, pathnames } from './config';

export const intlMiddleware = createIntlMiddleware({
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
});
