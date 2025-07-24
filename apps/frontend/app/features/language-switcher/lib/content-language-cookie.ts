import Cookies from 'js-cookie';

export type ContentLanguage = 'en' | 'ru';

export const ALL_CONTENT_LANGUAGES: ContentLanguage[] = ['en', 'ru'];

export const isContentLanguage = (val: unknown): val is ContentLanguage => val === 'en' || val === 'ru';

export const CONTENT_LANGUAGE_COOKIE_NAME = 'prefers-content-languages';

export const getCookieStringContentLanguages = (cookieString: string | null | undefined): ContentLanguage[] => {
  const val = cookieString
    ?.split('; ')
    .find((row) => row.startsWith(`${CONTENT_LANGUAGE_COOKIE_NAME}=`))
    ?.split('=')[1];

  if (!val) return ALL_CONTENT_LANGUAGES; // Default to all languages

  try {
    const parsed = JSON.parse(decodeURIComponent(val));
    if (Array.isArray(parsed) && parsed.every(isContentLanguage)) {
      return parsed;
    }
  } catch {
    // Invalid JSON, return default
  }

  return ALL_CONTENT_LANGUAGES; // Default to all languages
};

export const getRequestCookieHeader = (request: Request) => {
  const header = request.headers.get('Cookie');
  return getCookieStringContentLanguages(header);
};

export const updateDocumentCookieContentLanguages = (contentLanguages: ContentLanguage[]) => {
  if (!contentLanguages.length) {
    Cookies.remove(CONTENT_LANGUAGE_COOKIE_NAME);
  } else {
    Cookies.set(CONTENT_LANGUAGE_COOKIE_NAME, JSON.stringify(contentLanguages), {
      expires: 365,
      path: '/',
    });
  }
};
