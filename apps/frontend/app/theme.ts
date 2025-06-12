import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    teal: [
      '#f1f8f9',
      '#e5edee',
      '#c5dadc',
      '#a2c7cb',
      '#86b7bc',
      '#73adb2',
      '#68a8ae',
      '#579399',
      '#4a8388',
      '#1d3d40',
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
