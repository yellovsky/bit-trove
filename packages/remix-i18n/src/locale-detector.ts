// global modules
import { pick } from 'accept-language-parser';
import type { SessionStorage } from '@remix-run/server-runtime';

// local modules
import { getClientLocales } from './get-client-locales';

export interface LanguageDetectorOption {
  supportedLanguages: string[];
  fallbackLanguage: string;
  getCookieLocale?: (request: Request) => string | null;
  sessionStorage?: SessionStorage;
  sessionKey?: string;
  searchParamKey?: string;
  order?: Array<'path' | 'searchParams' | 'cookie' | 'session' | 'header'>;
}

export class LanguageDetector {
  constructor(private readonly options: LanguageDetectorOption) {
    this.#isSessionOnly(options);
    this.#isCookieOnly(options);
  }

  getUrlLocale(request: Request): string | null {
    const url = new URL(request.url);
    const maybeLocale = url.pathname.split('/').filter(Boolean)[0];
    return this.#fromSupported(maybeLocale);
  }

  async detect(request: Request): Promise<string> {
    const order = ['path', 'searchParams', 'cookie', 'session', 'header'];

    for (const method of order) {
      let locale: string | null = null;
      if (method === 'path') locale = this.getUrlLocale(request);
      if (method === 'searchParams') locale = this.#fromSearchParams(request);
      if (method === 'cookie') locale = await this.#fromCookie(request);
      if (method === 'session') locale = await this.#fromSessionStorage(request);
      if (method === 'header') locale = this.#fromHeader(request);
      if (locale) return locale;
    }

    return this.options.fallbackLanguage;
  }

  #isSessionOnly(options: LanguageDetectorOption) {
    if (options.order?.length === 1 && options.order[0] === 'session' && !options.sessionStorage) {
      throw new Error(
        'You need a sessionStorage if you want to only get the locale from the session'
      );
    }
  }

  #isCookieOnly(options: LanguageDetectorOption) {
    if (options.order?.length === 1 && options.order[0] === 'cookie' && !options.getCookieLocale) {
      throw new Error('You need a cookie if you want to only get the locale from the cookie');
    }
  }

  #fromSearchParams(request: Request): string | null {
    const url = new URL(request.url);
    return !url.searchParams.has(this.options.searchParamKey ?? 'lng')
      ? null
      : this.#fromSupported(url.searchParams.get(this.options.searchParamKey ?? 'lng'));
  }

  async #fromCookie(request: Request): Promise<string | null> {
    if (!this.options.getCookieLocale) return null;

    const localeCookie = this.options.getCookieLocale(request);
    return typeof localeCookie !== 'string' || !localeCookie
      ? null
      : this.#fromSupported(localeCookie);
  }

  async #fromSessionStorage(request: Request): Promise<string | null> {
    if (!this.options.sessionStorage) return null;
    const session = await this.options.sessionStorage.getSession(request.headers.get('Cookie'));
    const lng = session.get(this.options.sessionKey ?? 'lng');
    return !lng ? null : this.#fromSupported(lng);
  }

  #fromHeader(request: Request): string | null {
    const locales = getClientLocales(request);
    if (!locales) return null;
    if (Array.isArray(locales)) return this.#fromSupported(locales.join(','));
    return this.#fromSupported(locales);
  }

  #fromSupported(language: string | null) {
    return (
      pick(this.options.supportedLanguages, language ?? this.options.fallbackLanguage, {
        loose: false,
      }) ||
      pick(this.options.supportedLanguages, language ?? this.options.fallbackLanguage, {
        loose: true,
      })
    );
  }
}
