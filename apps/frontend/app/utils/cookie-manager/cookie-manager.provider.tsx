// global modules
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react';

// local modules
import { BrowserCookieManager } from './cookie-manager.browser';
import { SSRCookieManager } from './cookie-manager.ssr';
import type { CookieHash, CookieKey, CookieManager } from './cookie-manager.types';

const cookieManagerContext = createContext<CookieManager | null>(null);

export const CookieManagerProvider: FC<PropsWithChildren<{ cookieHash: CookieHash }>> = ({
  cookieHash,
  children,
}) => {
  const [cookieManager] = useState(() =>
    typeof window === 'undefined' ? new SSRCookieManager(cookieHash) : new BrowserCookieManager()
  );

  useEffect(() => () => cookieManager.dispose(), [cookieManager]);

  return (
    <cookieManagerContext.Provider value={cookieManager}>{children}</cookieManagerContext.Provider>
  );
};

export const useCookieManager = (): CookieManager => {
  const cookieManager = useContext(cookieManagerContext);
  if (!cookieManager) throw new Error('cookieManager not found in context');
  return cookieManager;
};

export const useCookie = (key: CookieKey): string | null => {
  const cookieManager = useCookieManager();

  return useSyncExternalStore(
    cookieManager.subscribe.bind(cookieManager),
    () => cookieManager.getCookie(key),
    () => cookieManager.getCookie(key)
  );
};
