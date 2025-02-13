// global modules
import type { CMSTutorial } from '@repo/api-models';
import { useTranslation } from 'react-i18next';
import { type Control, Controller, useFieldArray } from 'react-hook-form';
import { type FC, useCallback, useState } from 'react';

// common modules
import { Heading } from '~/components/heading';
import { LanguageCodes } from '~/components/language-codes';
import { ReactFormTextareaControl } from '~/components/form-controls/react-form-textarea-control';
import { ReactFormTextControl } from '~/components/form-controls/react-form-text-control';

// local modules
import { UpsertTutorialFormBlocks } from './upsert-tutorial.blocks';

interface UpsertTutorialFormTranslationsContentProps {
  languageCode: string;
  control: Control<CMSTutorial>;
}

const UpsertTutorialFormTranslationsContent: FC<
  UpsertTutorialFormTranslationsContentProps
> = props => {
  const { t: cmsT } = useTranslation('cms');
  const translations = useFieldArray({ control: props.control, name: 'translations' });
  const index = translations.fields.findIndex(f => f.language_code === props.languageCode);

  return (
    <>
      <Controller
        control={props.control}
        name={`translations.${index}.title`}
        render={fieldsState => (
          <ReactFormTextControl
            {...fieldsState}
            required
            inputProps={{ placeholder: cmsT('ENTER_TEXT_PLACEHOLDER') }}
            label={cmsT('TITLE_LABEL')}
          />
        )}
      />

      <Controller
        control={props.control}
        name={`translations.${index}.short_description`}
        render={fieldsState => (
          <ReactFormTextareaControl
            {...fieldsState}
            required
            inputProps={{ placeholder: cmsT('ENTER_TEXT_PLACEHOLDER') }}
            label={cmsT('SHORT_DESCRIPTION_LABEL')}
          />
        )}
      />

      <Controller
        control={props.control}
        name={`translations.${index}.seo_title`}
        render={fieldsState => (
          <ReactFormTextControl
            {...fieldsState}
            required
            inputProps={{ placeholder: cmsT('ENTER_TEXT_PLACEHOLDER') }}
            label={cmsT('SEO_TITLE_LABEL')}
          />
        )}
      />
      <Controller
        control={props.control}
        name={`translations.${index}.seo_keywords`}
        render={fieldsState => (
          <ReactFormTextControl
            {...fieldsState}
            required
            inputProps={{ placeholder: cmsT('ENTER_TEXT_PLACEHOLDER') }}
            label={cmsT('SEO_KEYWORDS_LABEL')}
          />
        )}
      />
      <Controller
        control={props.control}
        name={`translations.${index}.seo_description`}
        render={fieldsState => (
          <ReactFormTextareaControl
            {...fieldsState}
            required
            inputProps={{ placeholder: cmsT('ENTER_TEXT_PLACEHOLDER') }}
            label={cmsT('SEO_DESCRIPTION_LABEL')}
          />
        )}
      />

      <UpsertTutorialFormBlocks control={props.control} name={`translations.${index}.blocks`} />
    </>
  );
};

interface UpsertTutorialFormTranslationsProps {
  control: Control<CMSTutorial>;
}

export const UpsertTutorialFormTranslations: FC<UpsertTutorialFormTranslationsProps> = props => {
  const { t: cmsT } = useTranslation('cms');

  const translations = useFieldArray({ control: props.control, name: 'translations' });
  const usedLanguageCodes = translations.fields.map(f => f.language_code);

  const [selectedLanguage, updateSelectedLanguage] = useState(
    () => translations.fields.at(0)?.language_code,
  );

  const handleAddLanguageCode = useCallback(
    (language_code: string) => {
      translations.append({
        blocks: [],
        language_code,
        seo_description: '',
        seo_keywords: '',
        seo_title: '',
        short_description: '',
        title: '',
      });
      if (!selectedLanguage) updateSelectedLanguage(language_code);
    },
    [selectedLanguage],
  );

  return (
    <div>
      <Heading as="h2" className="mb-4" size="lg">
        {cmsT('TRANSLATIONS')}
      </Heading>

      <LanguageCodes
        onAddLanguageCode={handleAddLanguageCode}
        onSelectLanguageCode={updateSelectedLanguage}
        selectedLanguage={selectedLanguage}
        usedLanguageCodes={usedLanguageCodes}
      />
      <br />

      {!selectedLanguage ? null : (
        <UpsertTutorialFormTranslationsContent
          control={props.control}
          key={selectedLanguage}
          languageCode={selectedLanguage}
        />
      )}
    </div>
  );
};
