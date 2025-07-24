import { useAtom } from 'jotai';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '@repo/ui/components/Checkbox';
import { cn } from '@repo/ui/lib/utils';

import {
  ALL_CONTENT_LANGUAGES,
  type ContentLanguage,
  updateDocumentCookieContentLanguages,
} from '../lib/content-language-cookie';
import { selectedContentLanguagesAtom } from '../model/content-language-atom';
import { useContentLanguage } from './ContentLanguageProvider';
import styles from './LanguageSwitcher.module.css';

interface ContentLanguageSelectorProps {
  /** Optional className for additional styling */
  className?: string;
}

export const ContentLanguageSelector: FC<ContentLanguageSelectorProps> = ({ className }) => {
  const [selectedLanguages, setSelectedLanguages] = useAtom(selectedContentLanguagesAtom);
  const { setLanguages } = useContentLanguage();
  const { t } = useTranslation();

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
    setLanguages(newSelection);
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
    <div className={cn('space-y-3', className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-muted-foreground text-sm">{t('language_switcher.content_language')}</h3>
        <Checkbox
          checked={indeterminate ? 'indeterminate' : allSelected}
          className="h-4 w-4"
          label={t('language_switcher.all')}
          onCheckedChange={handleSelectAll}
        />
      </div>

      {/* Language Options */}
      <div className="space-y-2">
        {ALL_CONTENT_LANGUAGES.map((language) => (
          <Checkbox
            checked={selectedLanguages.includes(language)}
            className="h-4 w-4"
            key={language}
            label={
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    styles.flag,
                    'h-4 w-4 rounded-sm shadow-sm',
                    language === 'en' && styles.enUs,
                    language === 'ru' && styles.ru
                  )}
                />
                <span>{language === 'en' ? 'English' : 'Русский'}</span>
              </div>
            }
            onCheckedChange={(checked) => handleLanguageToggle(language, checked as boolean)}
          />
        ))}
      </div>

      {/* Help Text */}
      <p className="text-balance text-muted-foreground text-xs leading-relaxed">
        {selectedLanguages.length === 0
          ? t('language_switcher.help_text')
          : t('language_switcher.show content in {{count}} languages', {
              count: selectedLanguages.length,
            })}
      </p>
    </div>
  );
};
