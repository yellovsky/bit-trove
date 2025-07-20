import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { Link } from '@repo/ui/components/Link';
import { Separator } from '@repo/ui/components/Separator';
import { Toggle } from '@repo/ui/components/Toggle';
import { cn } from '@repo/ui/lib/utils';

import { ContentLanguageSelector } from './ContentLanguageSelector';
import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherContentProps {
  /** Optional className for additional styling */
  className?: string;
}

export const LanguageSwitcherContent: FC<LanguageSwitcherContentProps> = ({ className }) => {
  const { i18n, t } = useTranslation();
  const location = useLocation();

  return (
    <div className={cn('flex w-dvw flex-col gap-1 px-8 py-6 sm:w-80 sm:px-3 sm:py-3', className)}>
      {/* UI Language Section */}
      <div className="space-y-1">
        <h3 className="mb-2 font-medium text-muted-foreground text-sm">{t('language_switcher.interface_language')}</h3>

        <div className="grid grid-cols-2 gap-2">
          <Toggle asChild isActive={i18n.language === 'en'} variant="dimmed">
            <Link
              className={cn('flex items-center gap-3 px-3 py-2.5 font-medium text-sm ')}
              language="en"
              onClick={() => i18n.changeLanguage('en')}
              to={`${location.pathname}`}
            >
              <div className={cn(styles.flag, 'h-5 w-5 rounded-sm shadow-sm', styles.enUs)} />
              <span className="flex-1">English</span>
              {i18n.language === 'en' && <div className="size-1.5 rounded-full bg-primary-11" />}
            </Link>
          </Toggle>

          <Toggle asChild isActive={i18n.language === 'ru'} variant="dimmed">
            <Link
              className={cn('flex items-center gap-3 px-3 py-2.5 font-medium text-sm')}
              language="ru"
              onClick={() => i18n.changeLanguage('ru')}
              to={`${location.pathname}`}
            >
              <div className={cn(styles.flag, 'h-5 w-5 rounded-sm shadow-sm', styles.ru)} />
              <span className="flex-1">Русский</span>
              {i18n.language === 'ru' && <div className="size-1.5 rounded-full bg-primary-11" />}
            </Link>
          </Toggle>
        </div>
      </div>

      {/* Separator */}
      <Separator className="my-2" />

      {/* Content Language Section */}
      <ContentLanguageSelector />
    </div>
  );
};
