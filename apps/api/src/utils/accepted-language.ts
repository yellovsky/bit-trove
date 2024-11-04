const parseAcceptLanguage = (acceptLanguage: string): string[] => {
  return acceptLanguage
    .split(',')
    .map((lang) => {
      const [locale, q = 'q=1'] = lang.trim().split(';');
      return { locale, quality: parseFloat(q.split('=')[1]) };
    })
    .sort((a, b) => b.quality - a.quality)
    .map(({ locale }) => locale.toLowerCase());
};

export const getPreferredLocale = (
  acceptLanguage: string,
  allowedLocales: string[],
): string => {
  const parsedLocales = parseAcceptLanguage(acceptLanguage);

  for (const locale of parsedLocales) {
    // Check if there's an exact match or a match with just the language (e.g., "en" matches "en-US")
    if (allowedLocales.includes(locale)) return locale;

    // If there's a more general match (e.g., "en" to match "en-US")
    const languageOnly = locale.split('-')[0];
    const matchedLocale = allowedLocales.find((al) =>
      al.startsWith(languageOnly),
    );
    if (matchedLocale) return matchedLocale;
  }

  // Default or fallback locale if no matches found
  return allowedLocales[0];
};
