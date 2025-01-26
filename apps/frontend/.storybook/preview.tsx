// global modules
import Backend from 'i18next-http-backend';
import { createRemixStub } from '@remix-run/testing';
import { DecoratorHelpers } from '@storybook/addon-themes';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import type { Preview } from '@storybook/react';
// eslint-disable-next-line unused-imports/no-unused-imports
import React, { Suspense, useEffect } from 'react';

// local modules
import '../app/styles/root.scss';
import '../app/tailwind.scss';
import i18n, { languageNames } from '../app/config/i18n';

i18next
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ...i18n,
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    detection: { order: ['htmlTag'] },
    ns: ['common'],
  });

const { pluckThemeFromContext, initializeThemeState } = DecoratorHelpers;

const myCustomDecorator = ({ themes, defaultTheme }) => {
  initializeThemeState(Object.keys(themes), defaultTheme);
  return (storyFn, context) => {
    const selectedTheme = pluckThemeFromContext(context);
    const selected = selectedTheme || defaultTheme;
    const { locale } = context.globals;

    useEffect(() => {
      i18next.changeLanguage(locale);
    }, [locale]);

    useEffect(() => {
      document.documentElement.setAttribute('data-color-mode', selected);
      document.documentElement.setAttribute('style', `color-scheme: ${selected};`);
      document.body.style.backgroundColor = 'var(--color-bg-general)';
    }, [selected]);

    return (
      <Suspense fallback={<div>loading translations...</div>}>
        <I18nextProvider i18n={i18next}>{storyFn()}</I18nextProvider>
      </Suspense>
    );
  };
};

const preview: Preview = {
  decorators: [
    story => {
      const RemixStub = createRemixStub([
        {
          action: () => ({ redirect: '/' }),
          Component: () => story(),
          loader: () => ({ locale: 'ru', redirect: '/' }),
          path: '/*',
        },
      ]);

      return <RemixStub />;
    },
    myCustomDecorator({
      defaultTheme: 'light',
      themes: { dark: 'dark', light: 'light' },
    }),
  ],

  parameters: {
    backgrounds: { disable: true },
    layout: 'fullscreen',

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      name: 'Locale',
      toolbar: {
        icon: 'globe',
        items: i18n.supportedLngs.map(value => ({ title: languageNames[value], value })),
        showName: true,
      },
    },
  },
};

export default preview;
