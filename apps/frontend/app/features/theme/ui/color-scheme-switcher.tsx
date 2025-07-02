import { useAtomValue, useSetAtom } from 'jotai';
import { MoonIcon, SunIcon } from 'lucide-react';
import type { FC } from 'react';

import { Toggle } from '@repo/ui/components/Toggle';
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
    <Toggle aria-label="Color scheme" color="gray" onClick={toggleColorScheme}>
      {colorScheme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </Toggle>
  );
};
