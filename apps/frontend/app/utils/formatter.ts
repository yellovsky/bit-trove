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
  return useMemo(() => makeDateFormatter(locale || currentLocale), [locale || currentLocale]);
};

export const makeDateTimeFormatter = (locales: Intl.LocalesArgument) =>
  new Intl.DateTimeFormat(locales, {
    dateStyle: 'short',
    timeStyle: 'medium',
  });

export const useDateTimeFormatter = (locale?: Intl.LocalesArgument) => {
  const currentLocale = useLocale();
  return useMemo(() => makeDateTimeFormatter(locale || currentLocale), [locale || currentLocale]);
};
