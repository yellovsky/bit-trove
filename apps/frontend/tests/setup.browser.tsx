import '../app/root.css';

import ICU from 'i18next-icu';
import { createInstance, i18n } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import {  MemoryRouter } from 'react-router';
import { PropsWithChildren, ComponentType, FC } from 'react';

import { i18n as i18nParams, resources } from '@app/localization';

// We extend the global test context with our custom functions that we pass into the context in beforeEach
declare module 'vitest' {
  export interface TestContext {
		instance: i18n
		TestWrapper: ComponentType<PropsWithChildren>;
  }
}

// We pass in our custom functions to the test context
beforeEach(async (ctx) => {
	const instance = createInstance();

	await instance
		.use(ICU)
		.use(initReactI18next)
		.init({ ...i18nParams, resources });

	const TestWrapper: FC<PropsWithChildren> = ({ children } ) => (
		<MemoryRouter>
			<I18nextProvider i18n={instance}>
				{children}
			</I18nextProvider>
		</MemoryRouter>
	);

	ctx.TestWrapper=TestWrapper
  ctx.instance = instance;
});

// We clear all mocks after each test (optional, feel free to remove it)
afterEach(() => {
  vi.clearAllMocks();
});
