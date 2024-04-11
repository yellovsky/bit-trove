// global modules
import { ChakraProvider } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';

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
import { QueryClientProvider } from './query-client-provider';
import { fontLinks, theme } from './theme';

type LoaderData = {
  locale: string;
  env: {
    NEXT_PUBLIC_API_HOST: string;
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const locale = params.locale || (await i18next.getLocale(request));

  const { NEXT_PUBLIC_API_HOST } = process.env;
  if (!NEXT_PUBLIC_API_HOST) throw new Response('Internal Server Error', { status: 500 });

  return json<LoaderData>({ env: { NEXT_PUBLIC_API_HOST }, locale });
};

export const handle = {
  i18n: 'common',
};

export const links: LinksFunction = () => {
  return [...fontLinks];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData() as LoaderData;
  const { i18n } = useTranslation();

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
          <QueryClientProvider>{children}</QueryClientProvider>
        </ChakraProvider>
        <ScrollRestoration />

        <script dangerouslySetInnerHTML={{ __html: `window.ENV = ${JSON.stringify(data.env)}` }} />

        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
