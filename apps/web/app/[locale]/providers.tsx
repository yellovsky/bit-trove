'use client';

// global modules
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

// local modules
import { getQueryClient } from '~/src/query-client';
import type { SupportedLocale } from '@bit-trove/localization/config';

interface ProvidersProps extends PropsWithChildren {
  locale: SupportedLocale;
  now: Date;
  timeZone: string;
  messages: AbstractIntlMessages;
}

export const Providers: FC<ProvidersProps> = ({ locale, children, now, messages, timeZone }) => (
  <NextIntlClientProvider messages={messages} locale={locale} timeZone={timeZone} now={now}>
    <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>
  </NextIntlClientProvider>
);
