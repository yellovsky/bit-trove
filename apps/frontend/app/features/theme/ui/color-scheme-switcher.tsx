import { useAtomValue, useSetAtom } from 'jotai';
import { MoonIcon, SunIcon } from 'lucide-react';
import type { FC } from 'react';

import { IconButton } from '@repo/ui/components/IconButton';
import { colorSchemeAtom, selectedColorSchemeAtom } from '@repo/ui/lib/color-scheme-atom';

import { updateDocumentCookieColorScheme } from '../lib/theme-cookie';

export const ColorSchemeSwitcher: FC = () => {
  const colorScheme = useAtomValue(colorSchemeAtom);
  const setSelectedColorScheme = useSetAtom(selectedColorSchemeAtom);

  const toggleColorScheme = () => {
    const newScheme = colorScheme === 'dark' ? 'light' : 'dark';

    setSelectedColorScheme(newScheme);
    updateDocumentCookieColorScheme(newScheme);
  };

  return (
    <IconButton aria-label="Color scheme" onClick={toggleColorScheme} variant="ghost">
      {colorScheme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};
