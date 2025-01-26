// global modules
import type { FC } from 'react';
import type { To } from 'history';
import { useTranslation } from 'react-i18next';

// common modules
import { Info } from '~/components/info';
import { languageNames } from '~/config/i18n';
import { Link } from '~/components/link';

interface LanguageMismatchInfoProps {
  availableLangCodes: string[];
  getLink(langCode: string): To;
}

export const LanguageMismatchInfo: FC<LanguageMismatchInfoProps> = props => {
  const { t } = useTranslation();

  const suggestLangeLinks = props.availableLangCodes
    .map(lang =>
      !languageNames[lang] ? null : (
        <Link lang={lang} to={props.getLink(lang)} variant="text">
          {languageNames[lang]}
        </Link>
      ),
    )
    .filter(val => !!val);

  return (
    <Info className="mb-8">
      {t('This page is not available in the selected language')}. {t('You can read it in:')}{' '}
      {suggestLangeLinks}
    </Info>
  );
};
