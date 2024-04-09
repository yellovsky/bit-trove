// global modules
import Backend from 'i18next-fs-backend';
import { RemixI18Next } from 'remix-i18next/server';
import { resolve } from 'node:path';

// local modules
import i18n from './i18n';

const i18next = new RemixI18Next({
  detection: {
    fallbackLanguage: i18n.fallbackLng,
    supportedLanguages: i18n.supportedLngs,
  },
  i18next: {
    ...i18n,
    backend: {
      loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
    },
  },
  plugins: [Backend],
});

export default i18next;
