// global modules
import { useFetcher } from '@remix-run/react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

export type ColorMode = 'light' | 'dark';

export const isColorMode = (mode: unknown): mode is ColorMode =>
  mode === 'light' || mode === 'dark';

const prefersDarkMQ = '(prefers-color-scheme: dark)';

const getPreferredTheme = (): ColorMode =>
  window.matchMedia(prefersDarkMQ).matches ? 'dark' : 'light';

const clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'dark'
    : 'light';

  const cl = document.documentElement.classList;

  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');

  if (!themeAlreadyApplied) {
    cl.add(theme);
  }


  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  } else {
    console.warn(
      "Hey, could you let Matt know you're seeing this message? Thanks!",
    );
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

type ColorModeContextType = [ColorMode | null, Dispatch<SetStateAction<ColorMode | null>>];
const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export const ColorModeProvider: FC<PropsWithChildren<{ specifiedColorMode: ColorMode | null }>> = ({
  specifiedColorMode,
  children,
}) => {
  const [colorMode, setColorMode] = useState<ColorMode | null>(() =>
    specifiedColorMode
      ? specifiedColorMode
      : typeof window !== 'object'
        ? null
        : getPreferredTheme()
  );

  const persistTheme = useFetcher();

  const persistThemeRef = useRef(persistTheme);

  useEffect(() => {
    persistThemeRef.current = persistTheme;
  }, [persistTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersDarkMQ);
    const handleChange = () => setColorMode(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const mountRun = useRef(false);

  useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }

    if (!colorMode) return;

    persistThemeRef.current.submit(
      { colorMode },
      { action: 'action/set-color-mode', method: 'post' }
    );
  }, [colorMode]);

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
