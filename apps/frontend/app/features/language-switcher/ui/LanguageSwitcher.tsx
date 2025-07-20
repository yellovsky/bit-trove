import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton } from '@repo/ui/components/IconButton';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/Popover';
import { useMobile } from '@repo/ui/hooks/use-mobile';
import { cn } from '@repo/ui/lib/utils';

import styles from './LanguageSwitcher.module.css';
import { LanguageSwitcherContent } from './LanguageSwitcherContent';

export const LanguageSwitcher: FC = () => {
  const isMobile = useMobile();
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <IconButton aria-label={`Current language: ${i18n.language}`} variant={open ? 'soft' : 'ghost'}>
          <div
            className={cn(
              styles.flag,
              'h-4 w-4 rounded-sm shadow-sm transition-all duration-200',
              i18n.language === 'en' && styles.enUs,
              i18n.language === 'ru' && styles.ru
            )}
          />
        </IconButton>
      </PopoverTrigger>

      <PopoverContent align={'end'} className="p-0" side={isMobile ? 'bottom' : undefined}>
        <LanguageSwitcherContent />
      </PopoverContent>
    </Popover>
  );
};
