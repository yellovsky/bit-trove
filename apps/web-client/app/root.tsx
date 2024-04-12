// global modules
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';

import '@fontsource/roboto';
import '@fontsource-variable/montserrat';
import './root.scss';

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
import { getQueryClient } from './query-client';
import i18next from './i18next.server';

type LoaderData = {
  locale: string;
  env: {
    NEXT_PUBLIC_API_HOST: string;
  };
};

export const links: LinksFunction = () => [
  {
    href: 'https://yarnpkg.com/en/package/normalize.css',
    rel: 'stylesheet',
  },
];

export const loader: LoaderFunction = async ({ request, params }) => {
  const locale = params.locale || (await i18next.getLocale(request));

  const { NEXT_PUBLIC_API_HOST } = process.env;
  if (!NEXT_PUBLIC_API_HOST) throw new Response('Internal Server Error', { status: 500 });

  return json<LoaderData>({ env: { NEXT_PUBLIC_API_HOST }, locale });
};

export const handle = {
  i18n: 'common',
};

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,

  fonts: {
    body: `'Roboto', sans-serif`,
    heading: `'Montserrat Variable', sans-serif`,
  },

  colors: {
    primary: {
      50: '#defbfe',
      100: '#beedee',
      200: '#9cdfe0',
      300: '#77d0d2',
      400: '#54c3c5',
      500: '#3aa9ab',
      600: '#298485',
      700: '#185f60',
      800: '#04393a',
      900: '#001616',
    },
  },
});
console.log('theme', theme);
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
            {/* <ColorModeScript initialColorMode={theme.initialColorMode} /> */}

            <div>{children}</div>
          </QueryClientProvider>
        </ChakraProvider>
        <ScrollRestoration />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.env)}`,
          }}
        />

        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
