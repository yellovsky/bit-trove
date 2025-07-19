import type { FC } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/Popover';
import { useMobile } from '@repo/ui/hooks/use-mobile';

import { LanguageSwitcherButton } from './LanguageSwitcherButton';
import { LanguageSwitcherContent } from './LanguageSwitcherContent';

export const LanguageSwitcher: FC = () => {
  const isMobile = useMobile();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <LanguageSwitcherButton />
      </PopoverTrigger>

      <PopoverContent
        align={isMobile ? 'center' : undefined}
        className={isMobile ? 'w-[calc(100vw-2rem)] max-w-none' : undefined}
        side={isMobile ? 'bottom' : undefined}
      >
        <LanguageSwitcherContent />
      </PopoverContent>
    </Popover>
  );
};
