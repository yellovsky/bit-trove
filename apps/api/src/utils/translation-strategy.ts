export type GetTranslationsStrategy = <
  TWithTranslations extends {
    original_language_code?: string;
    translations: Array<{ language_code: string }>;
  },
>(
  withTranslations: TWithTranslations,
) => TWithTranslations['translations'][number] | null;

export const SUPPORTED_LANGUAGES = ['en', 'ru'];
export const DEFAULT_LANGUAGE_CODE = 'en';

const defaultLanguageTranslationStrategy: GetTranslationsStrategy = (
  withTranslations,
) =>
  withTranslations.translations.find(
    ({ language_code }) => language_code === DEFAULT_LANGUAGE_CODE,
  ) || null;

const originalLanguageTranslationStrategy: GetTranslationsStrategy = (
  withTranslations,
) =>
  withTranslations.translations.find(
    ({ language_code }) =>
      language_code === withTranslations.original_language_code,
  ) || null;

const anyLanguageTranslationStrategy: GetTranslationsStrategy = (
  withTranslations,
) => withTranslations.translations[0] || null;

const specificLanguageTranslationStratige =
  (languageCode: string): GetTranslationsStrategy =>
  (withTranslations) =>
    withTranslations.translations.find(
      ({ language_code }) => language_code === languageCode,
    ) || null;

export const fallbackToDefaultTranslationsStrategy =
  (languageCode: string): GetTranslationsStrategy =>
  (withTranslations) =>
    specificLanguageTranslationStratige(languageCode)(withTranslations) ||
    originalLanguageTranslationStrategy(withTranslations) ||
    defaultLanguageTranslationStrategy(withTranslations) ||
    anyLanguageTranslationStrategy(withTranslations);

export const defaultTranslationsStrategy =
  fallbackToDefaultTranslationsStrategy;
