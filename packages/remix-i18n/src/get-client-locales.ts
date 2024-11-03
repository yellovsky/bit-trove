// global modules
import { parseAcceptLanguage } from 'intl-parse-accept-language';

type Locales = string | string[] | undefined;

export const getClientLocales = (requestOrHeaders: Request | Headers): Locales => {
  const headers = requestOrHeaders instanceof Request ? requestOrHeaders.headers : requestOrHeaders;
  const acceptLanguage = headers.get('Accept-Language');

  if (!acceptLanguage) return undefined;

  const locales = parseAcceptLanguage(acceptLanguage, {
    ignoreWildcard: true,
    validate: Intl.DateTimeFormat.supportedLocalesOf,
  });

  return locales.length === 0 ? undefined : locales.length === 1 ? locales[0] : locales;
};
