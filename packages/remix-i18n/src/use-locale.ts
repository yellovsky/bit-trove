// global modules
import { useMatches } from '@remix-run/react';

export function useLocale(localeKey = 'locale'): string {
  const [rootMatch] = useMatches();
  const { [localeKey]: locale } = (rootMatch.data as Record<string, string>) ?? {};
  if (!locale) throw new Error('Missing locale returned by the root loader.');
  if (typeof locale === 'string') return locale;
  throw new Error('Invalid locale returned by the root loader.');
}
