// global modules
import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import type { FC, PropsWithChildren } from 'react';

// common modules
import { useCookie, useCookieManager } from '~/utils/cookie-manager';

// local modules
import { type ColorMode, isColorMode } from './color-mode.types';

const prefersDarkMQ = '(prefers-color-scheme: dark)';

const getPreferredTheme = (): ColorMode =>
  window.matchMedia(prefersDarkMQ).matches ? 'dark' : 'light';

const clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'dark'
    : 'light';

  const html = document.documentElement;
  const themeAlreadyApplied = !!html.getAttribute('data-color-mode');

  if (!themeAlreadyApplied) {
    html.setAttribute('data-color-mode', theme);
    html.setAttribute('style', "color-scheme:" + theme);
  }


  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  }
})();
`;

export const NonFlashOfWrongThemeEls: FC<{ ssrColorMode: boolean }> = ({ ssrColorMode }) => {
  const [colorMode] = useColorMode();

  return (
    <>
      <meta content={colorMode === 'light' ? 'light dark' : 'dark light'} name="color-scheme" />
      {ssrColorMode ? null : <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />}
    </>
  );
};

type ColorModeContextType = [ColorMode | null, (colorMode: ColorMode | null) => void];
const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export const ColorModeProvider: FC<PropsWithChildren<{ specifiedColorMode: ColorMode | null }>> = ({
  children,
}) => {
  const cookieManager = useCookieManager();
  const rawColorModeCookie = useCookie('color_mode');
  const cokieColorMode = isColorMode(rawColorModeCookie) ? rawColorModeCookie : null;

  const colorMode: ColorMode | null = useMemo(
    () =>
      cokieColorMode ? cokieColorMode : typeof window === 'undefined' ? null : getPreferredTheme(),
    [cokieColorMode],
  );

  const setColorMode = useCallback(
    (colorMode: ColorMode | null) =>
      colorMode
        ? cookieManager.setCookie('color_mode', colorMode, {
            daysToExpire: 0,
            httpOnly: false,
            secure: false,
          })
        : cookieManager.removeCookie('color_mode'),
    [cookieManager.setCookie],
  );

  useEffect(() => {
    if (cokieColorMode) return;
    const mediaQuery = window.matchMedia(prefersDarkMQ);
    const handleChange = () => setColorMode(mediaQuery.matches ? 'dark' : 'light');
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [cokieColorMode]);

  return (
    <ColorModeContext.Provider value={[colorMode, setColorMode]}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);

  if (context === undefined) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }

  return context;
};
