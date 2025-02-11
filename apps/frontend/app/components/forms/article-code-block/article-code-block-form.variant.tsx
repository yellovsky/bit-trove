// global modules
import { useTranslation } from 'react-i18next';
import type { ArticleCodeBlock, CodeBlockVariant } from '@repo/api-models';
import { type Control, useFieldArray } from 'react-hook-form';
import { type FC, useCallback, useState } from 'react';

// common modules
import { Button } from '~/components/button';
import { EmptyText } from '~/components/empty-text';
import { Modal } from '~/components/modal';
import { useModalState } from '~/components/../utils/use-modal-state';

// local modules
import { AddArticleCodeBlockFormVariantForm } from './article-code-block-form.add-variant';
import { variantsHolder as variantsHolderCn } from './article-code-block-form.module.scss';

interface ArticleCodeBlockFormVariantsProps {
  control: Control<ArticleCodeBlock>;
}

export const ArticleCodeBlockFormVariants: FC<ArticleCodeBlockFormVariantsProps> = props => {
  const { t: cmsT } = useTranslation('cms');
  const { closeModal, modalOpened, openModal } = useModalState();
  const variantsArray = useFieldArray({ control: props.control, name: 'content.variants' });
  const [selectedIndex, updateSelectedndex] = useState(0);

  const addVariant = useCallback(
    (variant: CodeBlockVariant) => {
      variantsArray.append(variant);
      updateSelectedndex(variantsArray.fields.length);

      closeModal();
    },
    [variantsArray.fields.length],
  );

  const selectedVariant = variantsArray.fields.at(selectedIndex);

  return (
    <div>
      <div className={variantsHolderCn}>
        <div>
          {variantsArray.fields.map((field, index) => (
            <Button
              key={field.label || field.filename || field.language}
              onClick={() => updateSelectedndex(index)}
              type="button"
              variant={index === selectedIndex ? 'filled' : 'soft'}
            >
              {field.label || field.filename || field.language}
            </Button>
          ))}
        </div>

        <div>
          <Button onClick={openModal} type="button" variant="soft">
            {cmsT('Add')}
          </Button>
        </div>
      </div>

      {!selectedVariant ? (
        <EmptyText>{cmsT('No code variants')}</EmptyText>
      ) : (
        JSON.stringify(selectedVariant)
      )}

      <Modal
        onClose={closeModal}
        opened={modalOpened}
        title={cmsT('Add code variant')}
        widthType="wide"
      >
        <AddArticleCodeBlockFormVariantForm onSubmit={addVariant} />
      </Modal>
    </div>
  );
};
