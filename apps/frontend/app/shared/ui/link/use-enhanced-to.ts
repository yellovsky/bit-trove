import type { To } from 'react-router';

import { SUPPORTED_LOCALES } from '@shared/config';
import { useLocale } from '@shared/lib/use-locale';

const removeLocaleFromPathname = (pathname: string): string =>
  pathname.replace(new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})`), '');

const addLocaleToPathname = (pathname: string, locale: string): string =>
  pathname.startsWith('http') ? pathname : `/${locale}${removeLocaleFromPathname(pathname)}`;

const setPathnameLocale = (pathname: string, locale: string): string =>
  addLocaleToPathname(pathname, locale).replace(/\/$/, '');

export const useMakeEnhancedTo = () => {
  const lng = useLocale();

  return (to: To, language?: string): To => {
    const lang = language ?? lng;

    return typeof to === 'string'
      ? setPathnameLocale(to, lang)
      : !to.pathname
        ? to
        : { ...to, pathname: setPathnameLocale(to.pathname, lang) };
  };
};
