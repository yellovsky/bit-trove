import '@fontsource-variable/geologica/index.css';
import { useColorScheme, selectedColorSchemeAtom } from '@repo/ui/lib/color-scheme-atom';
import {cx}from 'class-variance-authority'
import * as React from 'react';
import type { Preview } from '@storybook/react-vite'
import {addons} from 'storybook/preview-api';
import { useEffect } from 'react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import { reactRouterParameters, withRouter } from 'storybook-addon-remix-react-router';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import ICU from 'i18next-icu';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import {resources } from '../app/app/localization/resource'
import { getPaletteClassName } from '@repo/ui/lib/palette';

import '../app/root.css'

import i18n from '../app/app/localization/i18n';
import i18next from 'i18next';
import { useSetAtom } from 'jotai';

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode; }) {
	const colorScheme = useColorScheme()
	const setColorScheme = useSetAtom(selectedColorSchemeAtom);
  const handleColorScheme = (value: boolean) => setColorScheme(value ? 'dark' : 'light');

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [channel]);

	useEffect(() => {
		document.body.setAttribute('data-theme', colorScheme);
		document.body.classList.add(...getPaletteClassName('brand').split(' '));
	}, [colorScheme]);

	console.log(document.querySelectorAll('.docs-story').forEach(el => el.classList.add('bg-background')))

  return <div data-tmp className={getPaletteClassName('brand')}>{children}</div>;
}


await i18next
	.use(ICU)
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(Backend)
	.init({
		...i18n,
		resources,
		detection: {
			// Because we only use htmlTag, there's no reason to cache the language
			// on the browser, so we disable it
			caches: [],
			// Here only enable htmlTag detection, we'll detect the language only
			// server-side with remix-i18next, by using the `<html lang>` attribute
			// we can communicate to the client the language detected server-side
			order: ['htmlTag'],
		},
	});

const withI18next = (Story) => {
  return (
    // This catches the suspense from components not yet ready (still loading translations)
    // Alternative: set useSuspense to false on i18next.options.react when initializing i18next
    <React.Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18next}>
        <Story />
      </I18nextProvider>
    </React.Suspense>
  );
};

export const decorators = [
	withI18next,
	withRouter,
  (renderStory: any) => <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>,
];

const preview: Preview = {
  parameters: {
		reactRouter: reactRouterParameters({}),

		controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
  },
};

export default preview;
