// common modules
import { useCallback } from 'react';
import { useCookieManager } from '../cookie-manager';

export const useSetAccessToken = () => {
  const cookieManager = useCookieManager();

  return useCallback(
    (token: string) => {
      cookieManager.setCookie('access_token', token, {
        daysToExpire: 0,
        httpOnly: false,
        secure: false,
      });
    },
    [cookieManager]
  );
};
