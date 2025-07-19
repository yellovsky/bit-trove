import { cx } from 'class-variance-authority';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Toggle } from '@repo/ui/components/Toggle';

import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherButtonProps {
  /** Optional className for additional styling */
  className?: string;
  /** Optional aria-label for accessibility */
  'aria-label'?: string;
}

export const LanguageSwitcherButton: FC<LanguageSwitcherButtonProps> = ({ className, 'aria-label': ariaLabel }) => {
  const { i18n } = useTranslation();

  return (
    <Toggle
      aria-label={ariaLabel || `Current language: ${i18n.language}`}
      className={cx(
        'relative transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      variant="dimmed"
    >
      <div
        className={cx(
          styles.flag,
          'h-4 w-4 rounded-sm shadow-sm transition-all duration-200',
          i18n.language === 'en' && styles.enUs,
          i18n.language === 'ru' && styles.ru
        )}
      />
    </Toggle>
  );
};
