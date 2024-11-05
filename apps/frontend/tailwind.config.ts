// global modules
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

// local modules
import { focusOutline } from './tailwind/focus-outline';
import { fullOverlay } from './tailwind/full-overlay';
import { hocus } from './tailwind/hocus';
import { hoverable } from './tailwind/hoverable';
import { maskContain } from './tailwind/mask-contain';
import { textOverflowEllipsis } from './tailwind/text-overflow-ellipsis';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx,ts,tsx,scss}', '../../packages/ui/src/**/*.{js,jsx,ts,tsx,scss}'],

  darkMode: [
    'variant',
    [
      "@scope ([data-color-mode='dark']) { &:not([data-color-mode='light'] *) }",
      "&:is([data-color-mode='dark'] *)",
    ],
  ],

  plugins: [hoverable, hocus, maskContain, fullOverlay, focusOutline, textOverflowEllipsis],

  theme: {
    extend: {
      fontFamily: {
        body: ['Inter Variable', ...defaultTheme.fontFamily.sans],
        heading: ['Geologica Variable', ...defaultTheme.fontFamily.sans],
        monospace: ['Roboto Mono Variable', ...defaultTheme.fontFamily.mono],
      },

      boxShadow: {
        modal: `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,
          rgba(0, 0, 0, 0.2) 0px 5px 10px,
          rgba(0, 0, 0, 0.4) 0px 15px 40px;`,
      },

      borderRadius: {
        input: '0.5rem',
      },

      height: {
        header: '4rem',
      },

      zIndex: {
        /* eslint-disable sort-keys */
        under: '-10',
        zero: '0',
        base: '10',
        high: '20',
        highest: '30',
        header: '40',
        popup: '50',
        roof: '1000',
        /* eslint-enable sort-keys */
      },

      screens: {
        /* eslint-disable sort-keys */
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1440px',

        tablet: '768px', // md
        desktop: '992px', // lg
        /* eslint-enable sort-keys */
      },

      colors: {
        border: 'var(--color-border)',
        'focus-outline': 'var(--color-focus-outline)',
        invalid: 'var(--color-invalid)',
        passive: 'var(--color-passive)',
        pending: 'var(--color-pending)',
        success: 'var(--color-success)',
        text: 'var(--color-text)',
        warning: 'var(--color-warning)',

        bg: {
          general: 'var(--color-bg-general)',
          header: 'var(--color-bg-header)',
          'header-menu': 'var(--color-bg-header-menu)',
          pending: 'var(--color-bg-pending)',
        },

        accent: {
          active: 'rgb(var(--color-accent-active) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
        },

        // origin
        // primary: {
        //   50: '#E0F7FA',
        //   100: '#B2EBF2',
        //   200: '#81DEEA',
        //   300: '#4DCDD9',
        //   400: '#26C6DA',
        //   500: '#00A8CC',
        //   600: '#0097BA',
        //   700: '#0085A8',
        //   800: '#007195',
        //   900: '#005678',
        // },

        // by uicolors
        primary: {
          50: '#f2f7fd',
          100: '#e5eef9',
          200: '#c4dbf3',
          300: '#90bde9',
          400: '#559bdb',
          500: '#3182ce',
          600: '#2062a9',
          700: '#1b4f89',
          800: '#1a4472',
          900: '#1b3a5f',
          950: '#12253f',
        },

        gray: {
          50: 'rgb(244, 244, 244)',
          100: 'rgb(228, 228, 228)',
          150: 'rgb(211, 211, 211)',
          200: 'rgb(195, 195, 195)',
          250: 'rgb(179, 179, 179)',
          300: 'rgb(163, 163, 163)',
          350: 'rgb(147, 147, 147)',
          400: 'rgb(130, 130, 130)',
          450: 'rgb(114, 114, 114)',
          500: 'rgb(98, 98, 98)',
          550: 'rgb(82, 82, 82)',
          600: 'rgb(66, 66, 66)',
          650: 'rgb(50, 50, 50)',
          700: 'rgb(43, 43, 43)',
          750: 'rgb(36, 36, 36)',
          800: 'rgb(33, 33, 33)',
          850: 'rgb(30, 30, 30)',
          900: 'rgb(26, 26, 26)',
          950: 'rgb(23, 23, 23)',
        },

        yellow: {
          50: '#fffff0',
          100: '#fefcbf',
          200: '#faf089',
          300: '#f6e05e',
          400: '#ecc94b',
          500: '#d69e2e',
          600: '#b7791f',
          700: '#975a16',
          800: '#744210',
          900: '#5f370e',
        },

        red: {
          50: '#fff5f5',
          100: '#fed7d7',
          200: '#feb2b2',
          300: '#fc8181',
          400: '#f56565',
          500: '#e53e3e',
          600: '#c53030',
          700: '#9b2c2c',
          800: '#822727',
          900: '#63171b',
        },

        green: {
          50: '#f0fff4',
          100: '#c6f6d5',
          200: '#9ae6b4',
          300: '#68d391',
          400: '#48bb78',
          500: '#38a169',
          600: '#2f855a',
          700: '#276749',
          800: '#22543d',
          900: '#1c4532',
        },

        orange: {
          50: '#fffaf0',
          100: '#feebc8',
          200: '#fbd38d',
          300: '#f6ad55',
          400: '#ed8936',
          500: '#dd6b20',
          600: '#c05621',
          700: '#9c4221',
          800: '#7b341e',
          900: '#652b19',
        },

        // white alpha
        'white-alpha': {
          50: 'rgba(255, 255, 255, 0.04)',
          100: 'rgba(255, 255, 255, 0.06)',
          200: 'rgba(255, 255, 255, 0.08)',
          300: 'rgba(255, 255, 255, 0.16)',
          400: 'rgba(255, 255, 255, 0.24)',
          500: 'rgba(255, 255, 255, 0.36)',
          600: 'rgba(255, 255, 255, 0.48)',
          700: 'rgba(255, 255, 255, 0.64)',
          800: 'rgba(255, 255, 255, 0.8)',
          900: 'rgba(255, 255, 255, 0.92)',
        },

        // black alpha
        'black-alpha': {
          50: 'rgba(0, 0, 0, 0.04)',
          100: 'rgba(0, 0, 0, 0.06)',
          200: 'rgba(0, 0, 0, 0.08)',
          300: 'rgba(0, 0, 0, 0.16)',
          400: 'rgba(0, 0, 0, 0.24)',
          500: 'rgba(0, 0, 0, 0.36)',
          600: 'rgba(0, 0, 0, 0.48)',
          700: 'rgba(0, 0, 0, 0.64)',
          800: 'rgba(0, 0, 0, 0.8)',
          900: 'rgba(0, 0, 0, 0.92)',
        },
      },
    },
  },
} satisfies Config;
