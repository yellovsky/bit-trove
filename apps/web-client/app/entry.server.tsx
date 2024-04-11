// global modules
import Backend from 'i18next-fs-backend';
import createEmotionCache from '@emotion/cache';
import { createInstance } from 'i18next';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import { isbot } from 'isbot';
import { PassThrough } from 'stream';
import { RemixServer } from '@remix-run/react';
import { renderToPipeableStream } from 'react-dom/server';
import { resolve } from 'node:path';
import { createReadableStreamFromReadable, type EntryContext } from '@remix-run/node';
import { I18nextProvider, initReactI18next } from 'react-i18next';

// local modules
import { getRequestLang } from './get-request-lang';
import i18n from './i18n';
import i18next from './i18next.server';

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

    const emotionCache = createEmotionCache({ key: 'css' });

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

// // global modules
// import Backend from 'i18next-fs-backend';
// import createEmotionCache from '@emotion/cache';
// import { createInstance } from 'i18next';
// import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
// import { isbot } from 'isbot';
// import { PassThrough } from 'stream';
// import { RemixServer } from '@remix-run/react';
// import { renderToPipeableStream } from 'react-dom/server';
// import { resolve } from 'node:path';
// import { createReadableStreamFromReadable, type EntryContext } from '@remix-run/node';
// import { I18nextProvider, initReactI18next } from 'react-i18next';

// // local modules
// import { getRequestLang } from './get-request-lang';
// import i18n from './i18n';
// import i18next from './i18next.server';

// const ABORT_DELAY = 5000;

// export default async function handleRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext
// ) {
//   const callbackName = isbot(request.headers.get('user-agent')) ? 'onAllReady' : 'onShellReady';
//   const instance = createInstance();
//   const { lng, redirect } = await getRequestLang(request);
//   const ns = i18next.getRouteNamespaces(remixContext);

//   if (redirect) return new Response(null, { headers: { Location: redirect }, status: 303 });

//   await instance
//     .use(initReactI18next)
//     .use(Backend)
//     .init({
//       ...i18n,
//       lng,
//       ns,

//       backend: {
//         loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
//       },
//     });

//   return new Promise((resolve, reject) => {
//     let didError = false;

//     const emotionCache = createEmotionCache({ key: 'css' });

//     const { pipe, abort } = renderToPipeableStream(
//       <EmotionCacheProvider value={emotionCache}>
//         <I18nextProvider i18n={instance}>
//           <RemixServer context={remixContext} url={request.url} />
//         </I18nextProvider>
//       </EmotionCacheProvider>,
//       {
//         [callbackName]: () => {
//           const body = new PassThrough();
//           const stream = createReadableStreamFromReadable(body);
//           responseHeaders.set('Content-Type', 'text/html');

//           resolve(
//             new Response(stream, {
//               headers: responseHeaders,
//               status: didError ? 500 : responseStatusCode,
//             })
//           );

//           pipe(body);
//         },
//         onError(error: unknown) {
//           didError = true;

//           console.error(error);
//         },
//         onShellError(error: unknown) {
//           reject(error);
//         },
//       }
//     );

//     setTimeout(abort, ABORT_DELAY);
//   });
// }
