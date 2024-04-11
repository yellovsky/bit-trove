// global modules
import { extendTheme } from '@chakra-ui/react';
import type { LinkDescriptor } from '@remix-run/node';

export const fontLinks: LinkDescriptor[] = [
  {
    href: 'http://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&family=Public+Sans:wght@300;400;500;700&display=swap',
    rel: 'stylesheet',
  },

  {
    href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
    rel: 'stylesheet',
  },
];

export const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,

  fonts: {
    body: `'Roboto', sans-serif`,
    heading: `'Montserrat', sans-serif`,
  },

  components: {
    Tag: {
      variants: {
        link: {
          color: 'red',
          _hover: {
            color: 'green',
          },
          _focusVisible: {
            color: 'yellow',
          },
        },
      },
    },

    Link: {
      variants: {
        standalone: {
          color: 'red',
          _hover: {
            color: 'green',
          },
          _focusVisible: {
            color: 'yellow',
          },
        },
      },

      defaultProps: {
        size: 'md',
        variant: 'standalone',
      },
    },
  },

  colors: {
    primary: {
      50: '#defbfe',
      100: '#beedee',
      200: '#9cdfe0',
      300: '#77d0d2',
      400: '#54c3c5',
      500: '#3aa9ab',
      600: '#298485',
      700: '#185f60',
      800: '#04393a',
      900: '#001616',
    },
  },
});
