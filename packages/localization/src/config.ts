// global modules
import { Pathnames } from 'next-intl/navigation';

export const defaultLocale = 'en';

export const locales = [defaultLocale, 'ru'] as const;

export type SupportedLocale = (typeof locales)[number];

export const isSupportedLocale = (maybeLocale: string): maybeLocale is SupportedLocale =>
  locales.some((locale) => locale === maybeLocale);

export const pathnames: Pathnames<typeof locales> = {};

// Use the default: `always`
export const localePrefix = 'always';

export type AppPathnames = keyof typeof pathnames;
