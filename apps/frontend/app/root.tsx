import geologicaCss from '@fontsource-variable/geologica/index.css?url';
import interCss from '@fontsource-variable/inter/index.css?url';
import jetbrainsMonoCss from '@fontsource-variable/jetbrains-mono/index.css?url';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { cx } from 'class-variance-authority';
import { useAtomValue } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { queryClientAtom } from 'jotai-tanstack-query';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import type { LinkDescriptor, LinksFunction } from 'react-router';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from 'react-router';
import { useChangeLanguage } from 'remix-i18next/react';

import { Toaster } from '@repo/ui/components/Sonner';
import { type EnhanceTo, EnhanceToProvider } from '@repo/ui/hooks/enhance-to';
import { isColorScheme } from '@repo/ui/lib/color-scheme';
import { colorSchemeAtom, fallbackColorSchemeAtom, selectedColorSchemeAtom } from '@repo/ui/lib/color-scheme-atom';
import { getPaletteClassName } from '@repo/ui/lib/palette';

import { getQueryClient } from '@shared/lib/query-client';
import { useMakeEnhancedTo } from '@shared/lib/use-make-enhanced-to';
import { ErrorScreen } from '@shared/ui/error-route';

import { AppSuspenseWarning } from '@app/app-suspense-warning';
import { ClientHintCheck, getHints } from '@app/client-hints';

import { getCookieStringColorScheme } from '@features/theme';

import type { Route } from './+types/root';
import rootCss from './root.css?url';

const cssAssets: LinkDescriptor[] = [rootCss, geologicaCss, interCss, jetbrainsMonoCss]
  .map((href) => href.split('?')[0])
  .map((href) => ({ as: 'style', href, rel: 'stylesheet' }));

export const links: LinksFunction = () => [...cssAssets];

const queryClient = getQueryClient();

export async function loader({ context, request }: Route.LoaderArgs) {
  const { lang, clientEnv } = context;
  const hints = getHints(request);

  const cookieHeader = request.headers.get('Cookie');

  const storedTheme = getCookieStringColorScheme(cookieHeader);
  const selectedColorScheme = isColorScheme(storedTheme) ? storedTheme : null;

  return { clientEnv, hints, lang, selectedColorScheme };
}

export const handle = {
  i18n: ['common', 'auth'],
};

export default function App({ loaderData }: Route.ComponentProps) {
  useChangeLanguage(loaderData.lang);
  return <Outlet />;
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const loaderData = useLoaderData<typeof loader>();

  useHydrateAtoms([
    [queryClientAtom, queryClient],
    [fallbackColorSchemeAtom, loaderData.hints.theme],
    [selectedColorSchemeAtom, loaderData.selectedColorScheme],
  ]);

  const colorScheme = useAtomValue(colorSchemeAtom);
  const enhanceTo: EnhanceTo = useMakeEnhancedTo();

  return (
    <html
      data-app-env={loaderData.clientEnv.APP_ENV}
      data-public-api-host={loaderData.clientEnv.REMIX_PUBLIC_API_HOST}
      data-public-client-host={loaderData.clientEnv.REMIX_PUBLIC_CLIENT_HOST}
      data-theme={colorScheme}
      dir={i18n.dir()}
      lang={i18n.language}
    >
      <head>
        <ClientHintCheck />
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>

      <body className={cx('h-full w-full', getPaletteClassName('primary'), colorScheme)}>
        <Suspense fallback={<AppSuspenseWarning />}>
          <QueryClientProvider client={queryClient}>
            <EnhanceToProvider value={enhanceTo}>
              {children}
              <Toaster />
              <ReactQueryDevtools />
            </EnhanceToProvider>
          </QueryClientProvider>
        </Suspense>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export const ErrorBoundary = () => {
  const { t } = useTranslation();

  // NOTE loaderData is accessible in error boundary
  const loaderData = useLoaderData<typeof loader>();
  console.warn('loaderData in error boundary', loaderData);

  return (
    <ErrorScreen
      buttonText={t('error_page.500.button_text')}
      code={500}
      onButtonClick={() => window.location.reload()}
      subtitle={t('error_page.500.subtitle')}
      title={t('error_page.500.title')}
    />
  );
};
