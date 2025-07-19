import { cx } from 'class-variance-authority';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { Link } from '@repo/ui/components/Link';
import { Toggle } from '@repo/ui/components/Toggle';
import { useMobile } from '@repo/ui/hooks/use-mobile';

import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherContentProps {
  /** Optional className for additional styling */
  className?: string;
}

export const LanguageSwitcherContent: FC<LanguageSwitcherContentProps> = ({ className }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isMobile = useMobile();

  return (
    <div className={cx('flex flex-col gap-1 p-3', isMobile ? 'gap-2' : 'gap-1', className)}>
      <Toggle asChild variant="dimmed">
        <Link
          className={cx(
            'flex items-center gap-3 rounded-md px-3 py-2.5 font-medium text-sm transition-all duration-200',
            'hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'data-[state=active]:bg-accent data-[state=active]:text-accent-foreground',
            isMobile ? 'py-3 text-base' : 'py-2.5 text-sm'
          )}
          data-state={i18n.language === 'en' ? 'active' : 'inactive'}
          language="en"
          onClick={() => i18n.changeLanguage('en')}
          to={`${location.pathname}`}
        >
          <div className={cx(styles.flag, 'h-5 w-5 rounded-sm shadow-sm', styles.enUs)} />
          <span className="flex-1 text-left">English</span>
          {i18n.language === 'en' && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
        </Link>
      </Toggle>

      <Toggle asChild variant="dimmed">
        <Link
          className={cx(
            'flex items-center gap-3 rounded-md px-3 py-2.5 font-medium text-sm transition-all duration-200',
            'hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'data-[state=active]:bg-accent data-[state=active]:text-accent-foreground',
            isMobile ? 'py-3 text-base' : 'py-2.5 text-sm'
          )}
          data-state={i18n.language === 'ru' ? 'active' : 'inactive'}
          language="ru"
          onClick={() => i18n.changeLanguage('ru')}
          to={`${location.pathname}`}
        >
          <div className={cx(styles.flag, 'h-5 w-5 rounded-sm shadow-sm', styles.ru)} />
          <span className="flex-1 text-left">Русский</span>
          {i18n.language === 'ru' && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
        </Link>
      </Toggle>
    </div>
  );
};
