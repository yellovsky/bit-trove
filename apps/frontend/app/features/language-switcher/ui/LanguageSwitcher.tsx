import type { FC } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/Popover';

import { LanguageSwitcherButton } from './LanguageSwitcherButton';
import { LanguageSwitcherContent } from './LanguageSwitcherContent';

export const LanguageSwitcher: FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <LanguageSwitcherButton />
      </PopoverTrigger>

      <PopoverContent>
        <LanguageSwitcherContent />
      </PopoverContent>
    </Popover>
  );
};
