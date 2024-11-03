export type CookieKey = 'color_mode' | 'access_token' | 'locale';
export type CookieHash = Record<CookieKey, string | null>;

export interface SetCookieOptions {
  daysToExpire?: number;
  httpOnly?: boolean;
  path?: string;
  sameSite?: 'Lax';
  secure?: boolean;
}

/**
 * Represents a cookie manager that provides methods for managing cookies.
 */
export interface CookieManager {
  /**
   * Disposes the cookie manager and performs any necessary cleanup.
   */
  dispose: () => void;

  /**
   * Subscribes to changes in the cookie manager.
   * @param fn - The callback function to be called when a change occurs.
   * @returns A function that can be used to unsubscribe from the changes.
   */
  subscribe: (fn: () => void) => () => void;

  /**
   * Sets a cookie with the specified name, value, and options.
   * @param name - The name of the cookie.
   * @param value - The value of the cookie.
   * @param options - The options for the cookie.
   */
  setCookie: (name: CookieKey, value: string, options: SetCookieOptions) => void;

  /**
   * Removes a cookie with the specified name.
   * @param name - The name of the cookie to remove.
   */
  removeCookie: (name: CookieKey) => void;

  /**
   * Gets the value of a cookie with the specified name.
   * @param name - The name of the cookie to get.
   * @returns The value of the cookie, or null if the cookie does not exist.
   */
  getCookie: (name: CookieKey) => string | null;
}
