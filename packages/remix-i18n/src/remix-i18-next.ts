// global modules
import type { EntryContext } from '@remix-run/server-runtime';

import {
  type BackendModule,
  createInstance,
  type InitOptions,
  type Module,
  type Namespace,
  type NewableModule,
  type TFunction,
} from 'i18next';

// local modules
import { LanguageDetector, type LanguageDetectorOption } from './locale-detector';

export const DEFAULT_NS: Namespace = 'common';

export interface RemixI18NextOption {
  i18next?: Omit<InitOptions, 'react' | 'detection'> | null;
  backend?: NewableModule<BackendModule<unknown>> | BackendModule<unknown>;
  plugins?: NewableModule<Module>[] | Module[];
  detection: LanguageDetectorOption;
}

export class RemixI18Next {
  #detector: LanguageDetector;
  #options: RemixI18NextOption;

  constructor(options: RemixI18NextOption) {
    this.#options = options;
    this.#detector = new LanguageDetector(options.detection);
  }

  async getLocale(request: Request): Promise<string> {
    return this.#detector.detect(request);
  }

  getRouteNamespaces(context: EntryContext): string[] {
    const namespaces = Object.values(context.routeModules).flatMap((route) => {
      if (typeof route?.handle !== 'object') return [];
      if (!route.handle) return [];
      if (!('i18n' in route.handle)) return [];
      if (typeof route.handle.i18n === 'string') return [route.handle.i18n];
      if (
        Array.isArray(route.handle.i18n) &&
        route.handle.i18n.every((value) => typeof value === 'string')
      ) {
        return route.handle.i18n as string[];
      }
      return [];
    });

    return [...new Set(namespaces)];
  }

  async getFixedT<N extends Namespace>(
    locale: string,
    namespaces?: N,
    options?: Omit<InitOptions, 'react'>
  ): Promise<TFunction<N>>;
  async getFixedT<N extends Namespace>(
    request: Request,
    namespaces?: N,
    options?: Omit<InitOptions, 'react'>
  ): Promise<TFunction<N>>;
  async getFixedT<N extends Namespace>(
    requestOrLocale: Request | string,
    namespaces?: N,
    options: Omit<InitOptions, 'react'> = {}
  ) {
    let parsedNamespaces = namespaces ?? DEFAULT_NS;

    if (!namespaces || namespaces.length === 0) {
      parsedNamespaces = (this.#options.i18next?.defaultNS || 'translation') as N;
    }

    const [instance, locale] = await Promise.all([
      this.#createInstance({
        ...this.#options.i18next,
        ...options,
        defaultNS: typeof parsedNamespaces === 'string' ? parsedNamespaces : parsedNamespaces[0],
        fallbackNS: parsedNamespaces,
      }),
      typeof requestOrLocale === 'string' ? requestOrLocale : this.getLocale(requestOrLocale),
    ]);

    await instance.changeLanguage(locale);
    await instance.loadNamespaces(parsedNamespaces);

    return instance.getFixedT(locale, parsedNamespaces);
  }

  getUrlLocale(request: Request): string | null {
    return this.#detector.getUrlLocale(request);
  }

  async #createInstance(options: Omit<InitOptions, 'react'> = {}) {
    const instance = createInstance();
    const plugins = [
      ...(this.#options.backend ? [this.#options.backend] : []),
      ...(this.#options.plugins || []),
    ];
    for (const plugin of plugins) instance.use(plugin);
    await instance.init(options);
    return instance;
  }
}
