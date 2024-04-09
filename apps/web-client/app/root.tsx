// global modules
import type { LoaderFunction } from '@remix-run/node';
import { QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

// local modules
import i18next from './i18next.server';
import { useState } from 'react';
import { getQueryClient } from './query-client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

type LoaderData = {
  locale: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const locale = params.locale || (await i18next.getLocale(request));
  return json<LoaderData>({ locale });
};

export const handle = {
  i18n: 'common',
};

import { ColorModeScript } from '@chakra-ui/react';

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,

  colors: {
    primary: {
      50: '#e9faed',
      100: '#c5edce',
      200: '#a0e1ac',
      300: '#7ad488',
      400: '#54c862',
      500: '#3bae44',
      600: '#2d8832',
      700: '#206121',
      800: '#123a12',
      900: '#021403',
    },
  },
});

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData() as LoaderData;
  const { i18n } = useTranslation();
  const [queryClient] = useState(() => getQueryClient());

  return (
    <html dir={i18n.dir()} lang={data.locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <ColorModeScript initialColorMode={theme.initialColorMode} />

            {children}
          </QueryClientProvider>
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
