// import { PassThrough } from 'stream';

// import createEmotionCache from '@emotion/cache';
// import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
// import createEmotionServer from '@emotion/server/create-instance';
// import type { AppLoadContext, EntryContext } from '@remix-run/node';
// import { Response } from '@remix-run/node';
// import { RemixServer } from '@remix-run/react';
// import isbot from 'isbot';
// import { renderToPipeableStream } from 'react-dom/server';

// const ABORT_DELAY = 5000;

// const handleRequest = (
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext,
//   loadContext: AppLoadContext
// ) =>
//   isbot(request.headers.get('user-agent'))
//     ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
//     : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
// export default handleRequest;

// const handleBotRequest = (
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext
// ) =>
//   new Promise((resolve, reject) => {
//     let didError = false;
//     const emotionCache = createEmotionCache({ key: 'css' });

//     const { pipe, abort } = renderToPipeableStream(
//       <EmotionCacheProvider value={emotionCache}>
//         <RemixServer context={remixContext} url={request.url} />
//       </EmotionCacheProvider>,
//       {
//         onAllReady: () => {
//           const reactBody = new PassThrough();
//           const emotionServer = createEmotionServer(emotionCache);

//           const bodyWithStyles = emotionServer.renderStylesToNodeStream();
//           reactBody.pipe(bodyWithStyles);

//           responseHeaders.set('Content-Type', 'text/html');

//           resolve(
//             new Response(bodyWithStyles, {
//               headers: responseHeaders,
//               status: didError ? 500 : responseStatusCode,
//             })
//           );

//           pipe(reactBody);
//         },
//         onShellError: (error: unknown) => {
//           reject(error);
//         },
//         onError: (error: unknown) => {
//           didError = true;

//           console.error(error);
//         },
//       }
//     );

//     setTimeout(abort, ABORT_DELAY);
//   });

// const handleBrowserRequest = (
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext
// ) =>
//   new Promise((resolve, reject) => {
//     let didError = false;
//     const emotionCache = createEmotionCache({ key: 'css' });

//     const { pipe, abort } = renderToPipeableStream(
//       <EmotionCacheProvider value={emotionCache}>
//         <RemixServer context={remixContext} url={request.url} />
//       </EmotionCacheProvider>,
//       {
//         onShellReady: () => {
//           const reactBody = new PassThrough();
//           const emotionServer = createEmotionServer(emotionCache);

//           const bodyWithStyles = emotionServer.renderStylesToNodeStream();
//           reactBody.pipe(bodyWithStyles);

//           responseHeaders.set('Content-Type', 'text/html');

//           resolve(
//             new Response(bodyWithStyles, {
//               headers: responseHeaders,
//               status: didError ? 500 : responseStatusCode,
//             })
//           );

//           pipe(reactBody);
//         },
//         onShellError: (error: unknown) => {
//           reject(error);
//         },
//         onError: (error: unknown) => {
//           didError = true;

//           console.error(error);
//         },
//       }
//     );

//     setTimeout(abort, ABORT_DELAY);
//   });

// global modules
import Backend from 'i18next-fs-backend';
// import createEmotionServer fro  m '@emotion/server/create-instance'
import { createInstance } from 'i18next';
import { isbot } from 'isbot';
import { PassThrough } from 'stream';
import { RemixServer } from '@remix-run/react';
import { renderToPipeableStream } from 'react-dom/server';
import { resolve } from 'node:path';
import { createReadableStreamFromReadable, type EntryContext } from '@remix-run/node';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
// local modules
import { getRequestLang } from './get-request-lang';
import i18n from './i18n';
import i18next from './i18next.server';
import { ServerStyleContext } from './context';
import createEmotionCache from './create-emotion-cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
const ABORT_DELAY = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const callbackName = isbot(request.headers.get('user-agent')) ? 'onAllReady' : 'onShellReady';
  const instance = createInstance();
  const { lng, redirect } = await getRequestLang(request);
  const ns = i18next.getRouteNamespaces(remixContext);

  if (redirect) return new Response(null, { headers: { Location: redirect }, status: 303 });

  await instance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns,

      backend: {
        loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
      },
    });

  return new Promise((resolve, reject) => {
    let didError = false;

    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);
    const emotionCache = createEmotionCache();

    const { pipe, abort } = renderToPipeableStream(
      <EmotionCacheProvider value={emotionCache}>
        <I18nextProvider i18n={instance}>
          <RemixServer context={remixContext} url={request.url} />
        </I18nextProvider>
      </EmotionCacheProvider>,
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
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
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
