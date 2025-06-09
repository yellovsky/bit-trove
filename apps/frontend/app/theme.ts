import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    teal: [
      '#eff8fb',
      '#e0edf1',
      '#bbdae5',
      '#93c6d8',
      '#74b5cd',
      '#61abc7',
      '#55a6c5',
      '#4591ae',
      '#39819c',
      '#164555',
    ],
  },
  defaultRadius: 'md',

  fontFamily: 'Inter Variable, sans-serif',
  fontFamilyMonospace: 'Roboto Mono Variable, monospace',

  headings: {
    fontFamily: 'Geologica Variable, sans-serif',
  },
  primaryColor: 'teal',
  white: '#F7F8F9',
});
