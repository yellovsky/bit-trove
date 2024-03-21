// global modules
import createMiddleware from 'next-intl/middleware';

// local modules
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './constants';

export default createMiddleware({
  locales: SUPPORTED_LOCALES,
  localeDetection: true,
  defaultLocale: DEFAULT_LOCALE,
});

export const config = {
  matcher: '/((?!_next|assets).*)',
};
