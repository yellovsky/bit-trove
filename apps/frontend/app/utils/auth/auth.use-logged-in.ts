// local modules
import { useCookie } from '../cookie-manager/cookie-manager.provider';

export const useAccessToken = (): string | null => useCookie('access_token');
export const useLoggedIn = (): boolean => !!useAccessToken();
