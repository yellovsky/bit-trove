// global modules
import type { BlogPostSegment, GuideItemSegment } from '@repo/api-models';
import type { Path, To } from 'history';

// common modules
import { getClientHost } from '~/utils/env';

const removeLastSlash = (pathname: string): string => pathname.replace(/\/{1,2}$/, '');

// ============================================================================
//            A D D   H O S T N A M E   T O   L I N K
// ============================================================================
export const addHostnameToPathname = (pathname: string): string =>
  pathname.startsWith('http')
    ? removeLastSlash(pathname)
    : removeLastSlash(`${getClientHost()}${pathname}`);

export function addHostnameToLink(to: string): string;
export function addHostnameToLink(to: Partial<Path>): Partial<Path>;
export function addHostnameToLink<TTo extends To>(to: TTo) {
  if (typeof to === 'string') return addHostnameToPathname(to);
  if (!to.pathname) return to;
  return { ...(to as Partial<Path>), pathname: addHostnameToPathname(to.pathname) };
}

// ============================================================================
//              A D D   L O C A L E   T O   L I N K
// ============================================================================
const addLocaleToPathname = (linkWithoutLocale: string, locale?: string): string =>
  !locale ? removeLastSlash(linkWithoutLocale) : removeLastSlash(`/${locale}${linkWithoutLocale}`);

export function addLocaleToLink(to: string, locale: string | undefined): string;
export function addLocaleToLink(to: Partial<Path>, locale: string | undefined): Partial<Path>;
export function addLocaleToLink<TTo extends To>(to: TTo, locale: string | undefined) {
  if (!locale) return to;
  if (typeof to === 'string') return addLocaleToPathname(to, locale);
  if (!to.pathname) return to;
  return { ...(to as Partial<Path>), pathname: addLocaleToPathname(to.pathname, locale) };
}

// ============================================================================
//                   G U I D E S   R O U T E
// ============================================================================
export const getGuidesRouteLink = (locale?: string): string => addLocaleToLink('/guides', locale);

// ============================================================================
//               S I N G L E   G U I D E   R O U T E
// ============================================================================
export const getGuideRouteLink = (guide: Pick<GuideItemSegment, 'slug'>, locale?: string): string =>
  addLocaleToLink(`/guides/${guide.slug}`, locale);

// ============================================================================
//                    B L O G   R O U T E
// ============================================================================
export const getBlogRouteLink = (locale?: string): string => addLocaleToLink('/blog', locale);

// ============================================================================
//                B L O G   P O S T   R O U T E
// ============================================================================
export const getBlogpostRouteLink = (
  guide: Pick<BlogPostSegment, 'slug'>,
  locale?: string,
): string => addLocaleToLink(`/blog/${guide.slug}`, locale);
