import { cx } from 'class-variance-authority';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { Link } from '@repo/ui/components/Link';
import { Toggle } from '@repo/ui/components/Toggle';

import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherContentProps {
  /** Optional className for additional styling */
  className?: string;
}

export const LanguageSwitcherContent: FC<LanguageSwitcherContentProps> = ({ className }) => {
  const { i18n } = useTranslation();
  const location = useLocation();

  return (
    <div className={cx('flex flex-col gap-2 p-2', className)}>
      <Toggle asChild variant="dimmed">
        <Link
          className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-accent"
          language="en"
          onClick={() => i18n.changeLanguage('en')}
          to={`${location.pathname}`}
        >
          <div className={cx(styles.flag, 'h-4 w-4', styles.enUs)} />
          <span className="font-medium text-sm">English</span>
        </Link>
      </Toggle>

      <Toggle asChild variant="dimmed">
        <Link
          className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-accent"
          language="ru"
          onClick={() => i18n.changeLanguage('ru')}
          to={`${location.pathname}`}
        >
          <div className={cx(styles.flag, 'h-4 w-4', styles.ru)} />
          <span className="font-medium text-sm">Русский</span>
        </Link>
      </Toggle>
    </div>
  );
};
