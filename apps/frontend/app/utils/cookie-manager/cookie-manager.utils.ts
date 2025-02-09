// local modules
import type { CookieHash, CookieKey, SetCookieOptions } from './cookie-manager.types';

export const getCookie =
  (cookieString: string) =>
  (name: CookieKey): string | null => {
    const value = `; ${cookieString}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      const cookiePart = parts.pop()?.split(';').shift();
      return cookiePart ? decodeURIComponent(cookiePart) : null;
    }

    return null;
  };

export const getCookieHash = (request: Request): CookieHash => {
  const cookieString = request.headers.get('Cookie') || '';

  return {
    color_mode: getCookie(cookieString)('color_mode'),
    locale: getCookie(cookieString)('locale'),
  };
};

export const getSetCookie = (name: CookieKey, value: string, options: SetCookieOptions = {}) => {
  const {
    daysToExpire = 7,
    path = '/',
    httpOnly = false,
    secure = false,
    sameSite = 'Lax',
  } = options;

  const expiresDate = new Date();
  expiresDate.setTime(expiresDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = daysToExpire ? expiresDate.toUTCString() : '';

  return (
    `${name}=${encodeURIComponent(value)};expires=${expires};path=${path}` +
    `${httpOnly ? ';HttpOnly' : ''}${secure ? ';Secure' : ''};SameSite=${sameSite}`
  );
};
