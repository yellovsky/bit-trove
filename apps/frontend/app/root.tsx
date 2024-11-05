// global modules
import geologicaCss from '@fontsource-variable/geologica/index.css?url';
import interCss from '@fontsource-variable/inter/index.css?url';
import manropeCss from '@fontsource-variable/manrope/index.css?url';

import { QueryClientProvider } from '@tanstack/react-query';
import { useChangeLanguage } from '@repo/remix-i18n';
import { useTranslation } from 'react-i18next';
import { Suspense, useState } from 'react';

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';

import {
  json,
  type LinkDescriptor,
  type LinksFunction,
  type LoaderFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';

// common modules
import {
  type ColorMode,
  ColorModeProvider,
  isColorMode,
  NonFlashOfWrongThemeEls,
  useColorMode,
} from '~/components/color-mode';

// local modules
import { getQueryClient } from './query-client';
import { i18nServer } from './modules/i18n.server';
import rootCss from './styles/root.scss?url';
import stylesheetCss from '~/tailwind.scss?url';
import { type CookieHash, CookieManagerProvider, getCookieHash } from './utils/cookie-manager';

export const meta: MetaFunction = () => {
  return [{ title: 'Blog title' }, { content: 'Blog description', name: 'description' }];
};

const cssAssets: LinkDescriptor[] = [rootCss, interCss, manropeCss, geologicaCss, stylesheetCss]
  .map(href => href.split('?')[0])
  .map(href => ({ as: 'style', href, rel: 'stylesheet' }));

export const links: LinksFunction = () => [...cssAssets];

type LoaderData = {
  locale: string;
  colorMode: ColorMode | null;
  access_token: string | null;
  cookieHash: CookieHash;
  env: {
    API_HOST: string;
    CLIENT_HOST: string;
  };
};

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const { API_HOST, CLIENT_HOST } = process.env;
  if (!API_HOST || !CLIENT_HOST) throw new Response('Internal Server Error', { status: 500 });

  const setCookieHeaders: Array<['Set-Cookie', string]> = [];

  const cookieHash = getCookieHash(request);
  const urlLocale = i18nServer.getUrlLocale(request);
  const locale = await i18nServer.getLocale(request);
  const colorMode = isColorMode(cookieHash.color_mode) ? cookieHash.color_mode : null;

  if (urlLocale !== locale) setCookieHeaders.push(['Set-Cookie', locale]);

  return json<LoaderData>(
    {
      access_token: cookieHash.access_token,
      colorMode,
      cookieHash,
      env: { API_HOST, CLIENT_HOST },
      locale,
    },
    { headers: setCookieHeaders },
  );
};

export const handle = {
  i18n: ['common'],
};

export function App(props: { children: React.ReactNode } & LoaderData) {
  const { i18n } = useTranslation();
  const [colorMode] = useColorMode();

  return (
    <html
      dir={i18n.dir()}
      lang={props.locale}
      {...(colorMode && {
        'data-color-mode': colorMode,
        style: { colorScheme: colorMode },
      })}
    >
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />

        <Meta />
        <NonFlashOfWrongThemeEls ssrColorMode={Boolean(props.colorMode)} />
        <Links />
      </head>
      <body>
        {props.children}
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

let suspenseFired = false;
const AppLoading = () => {
  if (!suspenseFired) {
    console.warn('Application Suspense rendering');
    suspenseFired = true;
  }

  return null;
};

export function ErrorBoundary() {
  const error = useRouteError();
  return isRouteErrorResponse(error) && error.status === 404 ? <div>404</div> : <div>500</div>;
}

export default function AppWithProviders() {
  const data = useLoaderData() as LoaderData;
  const [queryClient] = useState(() => getQueryClient());

  useChangeLanguage(data.locale);

  return (
    <CookieManagerProvider cookieHash={data.cookieHash}>
      <ColorModeProvider specifiedColorMode={data.colorMode}>
        <QueryClientProvider client={queryClient}>
          <App {...data}>
            <Suspense fallback={<AppLoading />}>
              <Outlet />
            </Suspense>
          </App>
        </QueryClientProvider>
      </ColorModeProvider>
    </CookieManagerProvider>
  );
}
