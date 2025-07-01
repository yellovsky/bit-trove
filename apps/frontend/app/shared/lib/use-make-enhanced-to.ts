import type { To } from 'react-router';

import { setPathnameLocale } from '@shared/lib/link';
import { useLocale } from '@shared/lib/use-locale';

export const useMakeEnhancedTo = () => {
  const lng = useLocale();

  return (to: To, language?: string): To => {
    const lang = language ?? lng;

    return typeof to === 'string'
      ? setPathnameLocale(to, lang)
      : !to.pathname
        ? to
        : { ...to, pathname: setPathnameLocale(to.pathname, lang) };
  };
};
