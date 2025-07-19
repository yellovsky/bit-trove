import { cx } from 'class-variance-authority';
import { useAtom } from 'jotai';
import type { FC } from 'react';

import { Checkbox } from '@repo/ui/components/Checkbox';
import { useMobile } from '@repo/ui/hooks/use-mobile';

import {
  ALL_CONTENT_LANGUAGES,
  type ContentLanguage,
  updateDocumentCookieContentLanguages,
} from '../lib/content-language-cookie';
import { selectedContentLanguagesAtom } from '../model/content-language-atom';
import styles from './LanguageSwitcher.module.css';

interface ContentLanguageSelectorProps {
  /** Optional className for additional styling */
  className?: string;
}

export const ContentLanguageSelector: FC<ContentLanguageSelectorProps> = ({ className }) => {
  const [selectedLanguages, setSelectedLanguages] = useAtom(selectedContentLanguagesAtom);
  const isMobile = useMobile();

  const handleLanguageToggle = (language: ContentLanguage, checked: boolean) => {
    let newSelection: ContentLanguage[];

    if (checked) {
      // Add language to selection
      newSelection = [...selectedLanguages, language];
    } else {
      // Remove language from selection
      newSelection = selectedLanguages.filter((lang) => lang !== language);
    }

    // Update atom state
    setSelectedLanguages(newSelection);

    // Update cookie
    updateDocumentCookieContentLanguages(newSelection);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked ? [...ALL_CONTENT_LANGUAGES] : [];

    // Update atom state
    setSelectedLanguages(newSelection);

    // Update cookie
    updateDocumentCookieContentLanguages(newSelection);
  };

  const allSelected = selectedLanguages.length === ALL_CONTENT_LANGUAGES.length;
  const someSelected = selectedLanguages.length > 0;
  const indeterminate = someSelected && !allSelected;

  return (
    <div className={cx('space-y-3', className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className={cx('font-medium text-muted-foreground', isMobile ? 'text-base' : 'text-sm')}>
          Content Languages
        </h3>
        <Checkbox
          checked={indeterminate ? 'indeterminate' : allSelected}
          className="h-4 w-4"
          label="All"
          onCheckedChange={handleSelectAll}
        />
      </div>

      {/* Language Options */}
      <div className={cx('space-y-2', isMobile ? 'space-y-3' : 'space-y-2')}>
        {ALL_CONTENT_LANGUAGES.map((language) => (
          <Checkbox
            checked={selectedLanguages.includes(language)}
            className="h-4 w-4"
            key={language}
            label={
              <div className="flex items-center gap-2">
                <div
                  className={cx(
                    styles.flag,
                    'h-4 w-4 rounded-sm shadow-sm',
                    language === 'en' && styles.enUs,
                    language === 'ru' && styles.ru
                  )}
                />
                <span className={isMobile ? 'text-base' : 'text-sm'}>{language === 'en' ? 'English' : 'Русский'}</span>
              </div>
            }
            onCheckedChange={(checked) => handleLanguageToggle(language, checked as boolean)}
          />
        ))}
      </div>

      {/* Help Text */}
      <p className={cx('text-muted-foreground text-xs leading-relaxed', isMobile ? 'text-sm' : 'text-xs')}>
        {selectedLanguages.length === 0
          ? 'No languages selected. All content will be shown.'
          : `Showing content in ${selectedLanguages.length === 1 ? '1 language' : `${selectedLanguages.length} languages`}.`}
      </p>
    </div>
  );
};
