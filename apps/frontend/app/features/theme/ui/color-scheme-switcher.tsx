import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { MoonIcon, SunIcon } from 'lucide-react';
import type { FC } from 'react';

import { Toggle } from '@repo/ui/components/Toggle';

export const ColorSchemeSwitcher: FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Toggle aria-label="Color scheme" color="gray" onClick={toggleColorScheme}>
      {colorScheme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </Toggle>
  );
};
