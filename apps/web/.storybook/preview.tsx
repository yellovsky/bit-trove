// global modules
import React from 'react';
import type { Preview } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';

// local modules
import '../app/globals.scss';
import { ThemeProvider } from '@bit-trove/ui/theme-provider';

const DARK_BG_COLOR = '#000';
const LIGHT_BG_COLOR = '#ffffff';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      return (
        <NextIntlClientProvider locale="en">
          <ThemeProvider
            withoutBackground
            dark={context.globals.backgrounds?.value === DARK_BG_COLOR}
          >
            {Story()}
          </ThemeProvider>
        </NextIntlClientProvider>
      );
    },
  ],

  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        {
          name: 'Light',
          value: LIGHT_BG_COLOR,
        },
        {
          name: 'Dark',
          value: DARK_BG_COLOR,
        },
      ],
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
