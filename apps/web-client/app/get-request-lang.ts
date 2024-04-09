// local modules
import i18n from './i18n';
import i18next from './i18next.server';

export const getRequestLang = async (
  request: Request
): Promise<{ lng: string; redirect?: string }> => {
  const url = new URL(request.url);
  const maybeUrlLocale = url.pathname.split('/').filter(Boolean)[0];
  const lng = i18n.supportedLngs.find((supported) => supported === maybeUrlLocale.toLowerCase());
  if (lng) return { lng };

  const preferredLang = await i18next.getLocale(request);
  return {
    lng: preferredLang,
    redirect: `/${preferredLang}${url.pathname}`,
  };
};
