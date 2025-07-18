import { cx } from 'class-variance-authority';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { Link } from '@repo/ui/components/Link';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/Popover';
import { Toggle } from '@repo/ui/components/Toggle';

import styles from './LanguageSwitcher.module.css';

export const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Toggle variant="dimmed">
          <div
            className={cx(
              styles.flag,
              'h-4 w-4',
              i18n.language === 'en' && styles.enUs,
              i18n.language === 'ru' && styles.ru
            )}
          />
        </Toggle>
      </PopoverTrigger>

      <PopoverContent>
        <Toggle asChild variant="dimmed">
          <Link language="en" onClick={() => i18n.changeLanguage('en')} to={`${location.pathname}`}>
            <div className={cx(styles.flag, 'h-4 w-4', styles.enUs)} />
          </Link>
        </Toggle>
        <Toggle asChild variant="dimmed">
          <Link language="ru" onClick={() => i18n.changeLanguage('ru')} to={`${location.pathname}`}>
            <div className={cx(styles.flag, 'h-4 w-4', styles.ru)} />
          </Link>
        </Toggle>
      </PopoverContent>
    </Popover>
  );
};
