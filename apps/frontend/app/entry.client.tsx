// global modules
import Backend from 'i18next-http-backend';
import { getInitialNamespaces } from '@repo/remix-i18n';
import { hydrateRoot } from 'react-dom/client';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { RemixBrowser } from '@remix-run/react';
import { startTransition } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

// local modules
import i18n from '~/config/i18n';

async function hydrate() {
  await i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
      ...i18n,
      backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
      detection: { order: ['htmlTag'] },
      ns: getInitialNamespaces(),
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <RemixBrowser />
      </I18nextProvider>,
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
