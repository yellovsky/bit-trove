// global modules
import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import { createRemixStub } from '@remix-run/testing';
import { DecoratorHelpers } from '@storybook/addon-themes';
import { ThemeProvider } from '@repo/ui/theme-provider';

// local modules
import '../app/root.scss';

const { pluckThemeFromContext, initializeThemeState } = DecoratorHelpers;

const myCustomDecorator = ({ themes, defaultTheme }) => {
  initializeThemeState(Object.keys(themes), defaultTheme);
  return (storyFn, context) => {
    const selectedTheme = pluckThemeFromContext(context);

    useEffect(() => {
      document.body.setAttribute('data-color-mode', selectedTheme);
      document.body.style.backgroundColor = 'var(--th-page-bg-color)';
    }, [selectedTheme]);

    return <ThemeProvider colorMode={selectedTheme}>{storyFn()}</ThemeProvider>;
  };
};

const preview: Preview = {
  decorators: [
    (story) => {
      const RemixStub = createRemixStub([
        {
          path: '/*',
          action: () => ({ redirect: '/' }),
          loader: () => ({ redirect: '/' }),
          Component: () => story(),
        },
      ]);

      return <RemixStub />;
    },
    myCustomDecorator({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],

  parameters: {
    backgrounds: {
      disable: true,
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
