// global modules
import { Pathnames } from 'next-intl/navigation';

export const defaultLocale = 'en';

export const locales = [defaultLocale, 'ru'] as const;

export const pathnames: Pathnames<typeof locales> = {};

// Use the default: `always`
export const localePrefix = 'always';

export type AppPathnames = keyof typeof pathnames;
