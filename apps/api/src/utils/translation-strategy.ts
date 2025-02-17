export type GetTranslationsStrategy = <
  TWithTranslations extends {
    original_language_code?: string;
    translations: Array<{ language_code: string } | { languageCode: string }>;
  },
>(
  withTranslations: TWithTranslations,
) => TWithTranslations['translations'][number] | null;

export const SUPPORTED_LANGUAGES = ['en', 'ru'];
export const DEFAULT_LANGUAGE_CODE = 'en';

const defaultLanguageTranslationStrategy: GetTranslationsStrategy = (
  withTranslations,
) =>
  withTranslations.translations.find((item) =>
    'language_code' in item
      ? item.language_code === DEFAULT_LANGUAGE_CODE
      : item.languageCode === DEFAULT_LANGUAGE_CODE,
  ) || null;

const originalLanguageTranslationStrategy: GetTranslationsStrategy = (
  withTranslations,
) =>
  withTranslations.translations.find((item) =>
    'language_code' in item
      ? item.language_code === withTranslations.original_language_code
      : item.languageCode === withTranslations.original_language_code,
  ) || null;

const anyLanguageTranslationStrategy: GetTranslationsStrategy = (
  withTranslations,
) => withTranslations.translations[0] || null;

const specificLanguageTranslationStratige =
  (languageCode: string): GetTranslationsStrategy =>
  (withTranslations) =>
    withTranslations.translations.find((item) =>
      'language_code' in item
        ? item.language_code === languageCode
        : item.languageCode === languageCode,
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
