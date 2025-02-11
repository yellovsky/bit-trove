// global modules
import type { FC } from 'react';

// common modules
import { Button } from '~/components/button';
import { Icon } from '~/components/icon';
import { languageNames, supportedLngs } from '~/config/i18n';

// local modules
import {
  addButtonContent as addButtonContentCn,
  buttons as buttonsCn,
  languageCodes as languageCodesCn,
  noLanguages as noLanguagesCn,
} from './language-codes.module.scss';

interface LanguageCodesProps {
  selectedLanguage?: string;
  usedLanguageCodes: string[];

  onSelectLanguageCode(languageCode: string): void;
  onAddLanguageCode(languageCode: string): void;
}

export const LanguageCodes: FC<LanguageCodesProps> = props => (
  <div className={languageCodesCn}>
    <div className={buttonsCn}>
      {props.usedLanguageCodes.length ? null : (
        <div className={noLanguagesCn}>No language codes added</div>
      )}

      {props.usedLanguageCodes.map(code => (
        <Button
          key={code}
          onClick={() => props.onSelectLanguageCode(code)}
          variant={code === props.selectedLanguage ? 'filled' : 'outline'}
        >
          {code in languageNames ? languageNames[code] : code}
        </Button>
      ))}
    </div>

    <div className={buttonsCn}>
      {supportedLngs
        .filter(code => !props.usedLanguageCodes.includes(code))
        .map(code => (
          <Button key={code} onClick={() => props.onAddLanguageCode(code)} variant="soft">
            <div className={addButtonContentCn}>
              <Icon type="addCircleFilled" />
              <span>{code in languageNames ? languageNames[code] : code}</span>
            </div>
          </Button>
        ))}
    </div>
  </div>
);
