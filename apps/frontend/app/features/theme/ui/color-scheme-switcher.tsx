import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import type { FC } from 'react';

export const ColorSchemeSwitcher: FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ActionIcon aria-label="Color scheme" color="gray" onClick={toggleColorScheme} variant="subtle">
      {colorScheme === 'dark' ? <IconMoon /> : <IconSun />}
    </ActionIcon>
  );
};
