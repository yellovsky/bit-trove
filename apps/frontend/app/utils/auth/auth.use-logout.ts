// global modules
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// common modules
import { setMyProfileResponseQuery } from '~/api/my';
import { useCookieManager } from '~/utils/cookie-manager';

export const useLogout = () => {
  const cookieManager = useCookieManager();
  const queryClient = useQueryClient();

  return useCallback(() => {
    setMyProfileResponseQuery(queryClient, undefined);
    cookieManager.removeCookie('access_token');
  }, [cookieManager.removeCookie]);
};
