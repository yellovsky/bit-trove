'use client';

// global modules
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';

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
  <NextIntlClientProvider locale={locale} messages={messages} now={now} timeZone={timeZone}>
    <QueryClientProvider client={getQueryClient()}>
      <ChakraProvider>{children}</ChakraProvider>
    </QueryClientProvider>
  </NextIntlClientProvider>
);
