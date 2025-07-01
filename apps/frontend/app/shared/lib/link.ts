import type { To } from 'react-router';

import { SUPPORTED_LOCALES } from '@shared/config';
import { getGlobal } from '@shared/lib/get-global';

export const toToHref = (to: To) => (typeof to === 'string' ? to : [to.pathname, to.search].filter(Boolean).join(''));
export const addClientHost = (to: To) => [getGlobal('REMIX_PUBLIC_CLIENT_HOST'), toToHref(to)].join('');

export const removeLocaleFromPathname = (pathname: string): string =>
  pathname.replace(new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})`), '');

export const addLocaleToPathname = (pathname: string, locale: string): string =>
  pathname.startsWith('http') ? pathname : `/${locale}${removeLocaleFromPathname(pathname)}`;

export const setPathnameLocale = (pathname: string, locale: string): string =>
  addLocaleToPathname(pathname, locale).replace(/\/$/, '');
