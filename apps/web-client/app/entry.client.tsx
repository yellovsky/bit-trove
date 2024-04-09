// global modules
import Backend from 'i18next-http-backend';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@emotion/cache';
import { getInitialNamespaces } from 'remix-i18next/client';
import { hydrateRoot } from 'react-dom/client';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { RemixBrowser } from '@remix-run/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { startTransition, StrictMode } from 'react';

// local modules
import i18n from './i18n';

async function hydrate() {
  const emotionCache = createEmotionCache({ key: 'scss' });

  // eslint-disable-next-line import/no-named-as-default-member
  await i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
      ...i18n,

      backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
      detection: { caches: [], order: ['htmlTag'] },
      ns: getInitialNamespaces(),
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <CacheProvider value={emotionCache}>
          <I18nextProvider i18n={i18next}>
            <RemixBrowser />
          </I18nextProvider>
        </CacheProvider>
      </StrictMode>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
