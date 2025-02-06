// global modules
import { useLocale } from '@repo/remix-i18n';
import { useMemo } from 'react';

export const makeDateFormatter = (locales: Intl.LocalesArgument) =>
  new Intl.DateTimeFormat(locales, {
    month: 'long',
    year: 'numeric',
  });

export const useDateFormatter = (locale?: Intl.LocalesArgument) => {
  const currentLocale = useLocale();

  return useMemo(
    () =>
      new Intl.DateTimeFormat(locale || currentLocale, {
        month: 'long',
        year: 'numeric',
      }),
    [locale || currentLocale],
  );
};
