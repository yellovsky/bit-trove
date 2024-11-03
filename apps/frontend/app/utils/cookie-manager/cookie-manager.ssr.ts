// local modules
import type { CookieHash, CookieKey, CookieManager } from './cookie-manager.types';

export class SSRCookieManager implements CookieManager {
  constructor(private cookieHash: CookieHash) {}

  dispose() {}

  setCookie() {
    console.warn('Try to set cookie when server render');
  }

  removeCookie() {
    console.warn('Try to remove cookie when server render');
  }

  getCookie(name: CookieKey): string | null {
    return this.cookieHash[name];
  }

  subscribe() {
    return () => {};
  }
}
