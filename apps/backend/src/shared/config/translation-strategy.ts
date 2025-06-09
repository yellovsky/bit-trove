import type { GetTranslationsStrategy } from '../utils/translation-strategy';

/**
 * Default translation strategy that uses the locale and fallback locale to get the translations.
 *
 * - If the locale is not defined, it will use the fallback locale.
 * - If the fallback locale is not defined, it will use the default locale.
 * - If the default locale is not defined, it will use the locale.
 *
 * @example
 * ```ts
 * const strategy = new DefaultTranslationStrategy({ locale: 'en', fallbackLocale: 'fr' });
 * ```
 */
export class DefaultTranslationStrategy implements GetTranslationsStrategy {
  public readonly fallbackFirstDefined: boolean = true;
  public readonly locale: string;
  public readonly fallbackLocale: string;

  constructor(params: {
    locale: string;
    fallbackLocale: string;
  }) {
    this.locale = params.locale;
    this.fallbackLocale = params.fallbackLocale;
  }
}
