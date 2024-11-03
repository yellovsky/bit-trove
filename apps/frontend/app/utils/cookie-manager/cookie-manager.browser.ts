// global modules
import EventEmitter from 'eventemitter3';

// local modules
import type { CookieKey, CookieManager, SetCookieOptions } from './cookie-manager.types';
import { getCookie, getSetCookie } from './cookie-manager.utils';

const COOKIE_CHANNEL_NAME = 'blog_cookie';

/**
 * Manages cookies in the browser.
 * Extends EventEmitter to allow subscribing to cookie change events.
 */
export class BrowserCookieManager implements CookieManager {
  #emitter = new EventEmitter<'change'>();
  #channel: BroadcastChannel;

  constructor() {
    this.#channel = new BroadcastChannel(COOKIE_CHANNEL_NAME);
    this.#channel.addEventListener('message', this.#handleBroadcastEvent);
  }

  // Dispose of resources when no longer needed
  dispose() {
    this.#emitter.removeAllListeners();
    this.#channel.removeEventListener('message', this.#handleBroadcastEvent);
  }

  // Getter for the channel field (for testing purposes)
  get channel() {
    return this.#channel;
  }

  // Set a cookie with the given name, value, and options
  setCookie(name: CookieKey, value: string, options: SetCookieOptions = {}) {
    try {
      document.cookie = getSetCookie(name, value, options);

      this.#emitter.emit('change', name);
      this.#channel.postMessage({ type: 'change' });
    } catch (error) {
      console.error(`Failed to set cookie: ${error}`);
    }
  }

  // Remove a cookie by setting its expiry date to the past
  removeCookie(name: CookieKey) {
    this.setCookie(name, '', { daysToExpire: -1 });
  }

  // Get the value of a cookie
  getCookie(name: CookieKey): string | null {
    return getCookie(document.cookie)(name);
  }

  // Subscribe to changes in the cookies
  subscribe(fn: () => void) {
    this.#emitter.on('change', fn);

    return () => {
      this.#emitter.off('change', fn);
    };
  }

  // Handle broadcast events
  #handleBroadcastEvent = () => {
    this.#emitter.emit('change');
  };
}
