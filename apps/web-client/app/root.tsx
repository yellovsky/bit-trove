// global modules
import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
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
import colorSchemasCss from './color-schemas.scss?url';
import rootCss from './root.scss?url';

import { getColorModeSession } from './utils/color-mode/color-mode.server';
import { getQueryClient } from './query-client';
import i18next from './i18next.server';

import {
  type ColorMode,
  ColorModeProvider,
  NonFlashOfWrongThemeEls,
  useColorMode,
} from './utils/color-mode';

export const links: LinksFunction = () => [
  {
    href: 'https://yarnpkg.com/en/package/normalize.css',
    rel: 'stylesheet',
  },
  {
    href: rootCss,
    rel: 'stylesheet',
  },
  {
    href: colorSchemasCss,
    rel: 'stylesheet',
  },
];

type LoaderData = {
  locale: string;
  colorMode: ColorMode | null;
  env: {
    NEXT_PUBLIC_API_HOST: string;
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const locale = params.locale || (await i18next.getLocale(request));

  const { NEXT_PUBLIC_API_HOST } = process.env;
  if (!NEXT_PUBLIC_API_HOST) throw new Response('Internal Server Error', { status: 500 });

  const colorModeSession = await getColorModeSession(request);

  return json<LoaderData>({
    colorMode: colorModeSession.getColorMode(),
    env: { NEXT_PUBLIC_API_HOST },
    locale,
  });
};

export const handle = {
  i18n: 'common',
};

function App(props: { children: React.ReactNode } & LoaderData) {
  const { i18n } = useTranslation();
  const [colorMode, setColorMode] = useColorMode();

  return (
    <html data-color-mode={colorMode} dir={i18n.dir()} lang={props.locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />

        <NonFlashOfWrongThemeEls ssrColorMode={Boolean(props.colorMode)} />
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <button
            onClick={() => {
              setColorMode(colorMode === 'dark' ? 'light' : 'dark');
            }}
          >
            mode: {colorMode}
          </button>
          {props.children}
        </div>
        <ScrollRestoration />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(props.env)}`,
          }}
        />

        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData() as LoaderData;
  const [queryClient] = useState(() => getQueryClient());

  return (
    <ColorModeProvider specifiedColorMode={data.colorMode}>
      <QueryClientProvider client={queryClient}>
        <App {...data}>
          <Outlet />
        </App>
      </QueryClientProvider>
    </ColorModeProvider>
  );
}
