// global modules
import { DEFAULT_NS } from '@repo/remix-i18n';

const fallbackLng = 'en';
const defaultNS = DEFAULT_NS;
export const supportedLngs = [fallbackLng, 'ru'];

export default {
  defaultNS,
  fallbackLng,
  react: { useSuspense: true },
  supportedLngs,
};

export const isSupportedLocale = (
  maybeLocale: unknown,
): maybeLocale is (typeof supportedLngs)[number] =>
  typeof maybeLocale !== 'string'
    ? false
    : supportedLngs.some(locale => locale.toLowerCase() === maybeLocale.toLowerCase());

export const languageNames: Partial<Record<string, string>> = {
  en: 'English',
  ru: 'Russian',
};
