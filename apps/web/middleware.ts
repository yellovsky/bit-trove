// global modules
import { intlMiddleware } from '@bit-trove/localization/middleware';

export default intlMiddleware;

export const config = {
  matcher: '/((?!_next|assets).*)',
};
