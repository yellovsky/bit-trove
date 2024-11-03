// global modules
import Backend from 'i18next-fs-backend';
import { RemixI18Next } from '@repo/remix-i18n';
import { resolve } from 'node:path';

// local modules
import { getCookie } from '~/utils/cookie-manager';
import i18n from '~/config/i18n';

export const i18nServer = new RemixI18Next({
  detection: {
    fallbackLanguage: i18n.fallbackLng,
    getCookieLocale: request => getCookie(request.headers.get('Cookie') || '')('locale'),
    supportedLanguages: i18n.supportedLngs,
  },
  i18next: { ...i18n, backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') } },
  plugins: [Backend],
});
