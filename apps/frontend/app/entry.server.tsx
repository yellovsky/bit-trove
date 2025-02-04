// global modules
import { createInstance } from 'i18next';
import { isbot } from 'isbot';
import { PassThrough } from 'stream';
import { RemixServer } from '@remix-run/react';
import { renderToPipeableStream } from 'react-dom/server';
import { resolve } from 'node:path';
import { createReadableStreamFromReadable, type EntryContext } from '@remix-run/node';
import FsBackend, { type FsBackendOptions } from 'i18next-fs-backend';
import { I18nextProvider, initReactI18next } from 'react-i18next';

// local modules
import i18n from '~/config/i18n';
import { i18nServer } from '~/modules/i18n';
import { getCookie, getSetCookie } from './utils/cookie-manager';

const ABORT_DELAY = 5000;

const prepareLocale = async (
  request: Request,
  responseHeaders: Headers,
): Promise<
  { locale: string; response?: undefined } | { locale?: undefined; response: Response }
> => {
  const urlLocale = i18nServer.getUrlLocale(request);

  if (!urlLocale) {
    const url = new URL(request.url);
    const preferredLocale = await i18nServer.getLocale(request);

    const redirect =
      url.pathname === '/'
        ? `/${preferredLocale}${url.search}`
        : `/${preferredLocale}${url.pathname}${url.search}`;

    responseHeaders.set(
      'Set-Cookie',
      getSetCookie('locale', preferredLocale, { daysToExpire: 0, httpOnly: false, secure: false }),
    );
    responseHeaders.set('Location', redirect);

    return { response: new Response(null, { headers: responseHeaders, status: 303 }) };
  }

  return { locale: urlLocale };
};

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const { locale, response } = await prepareLocale(request, responseHeaders);
  if (response) return response;

  const cookieLocale = getCookie(request.headers.get('Cookie') || '')('locale');

  if (cookieLocale !== locale) {
    responseHeaders.set(
      'Set-Cookie',
      getSetCookie('locale', locale, { daysToExpire: 0, httpOnly: false, secure: false }),
    );
  }

  const instance = createInstance();
  const callbackName = isbot(request.headers.get('user-agent')) ? 'onAllReady' : 'onShellReady';

  await instance
    .use(initReactI18next)
    .use(FsBackend)
    .init<FsBackendOptions>({
      ...i18n,
      backend: {
        loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
      },
      lng: locale,
      ns: i18nServer.getRouteNamespaces(remixContext),
    });

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RemixServer context={remixContext} url={request.url} />
      </I18nextProvider>,
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );

          pipe(body);
        },
        onError(error: unknown) {
          didError = true;

          console.error(error);
        },
        onShellError(error: unknown) {
          reject(error);
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
