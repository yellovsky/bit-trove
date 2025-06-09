/**
 * Interface for translation strategies.
 */
export interface GetTranslationsStrategy {
  /**
   * The locale to use for the translations.
   */
  locale: string;

  /**
   * The fallback locale to use for the translations.
   */
  fallbackLocale?: string;

  /**
   * Whether to use the fallback locale first if the locale is not defined.
   */
  fallbackFirstDefined?: boolean;
}

/**
 * Interface for translatable entities.
 */
export interface Translatable<TTranslation extends { languageCode: string }> {
  /**
   * The translations of the entity.
   */
  translations: TTranslation[];

  /**
   * Get the translations of the entity.
   */
  getTranslations(strategy: GetTranslationsStrategy): TTranslation | null;
}
