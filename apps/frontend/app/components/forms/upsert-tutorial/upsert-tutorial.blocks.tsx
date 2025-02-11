// global modules
import type { ArticleBlock } from '@repo/api-models';
import { useTranslation } from 'react-i18next';
import { type Control, useFieldArray } from 'react-hook-form';
import { type FC, useCallback, useState } from 'react';

// common modules
import { AnyBlock } from '~/components/blocks/any-block';
import { Button } from '~/components/button';
import { EmptyText } from '~/components/empty-text';
import { Heading } from '~/components/heading';
import { Modal } from '~/components/modal';
import type { UpdateTutorialVariables } from '~/api/tutorial';
import { useModalState } from '~/utils/use-modal-state';
import { ArticleCodeBlockForm, DEFAULT_CODE_BLOCK } from '~/components/forms/article-code-block';
import { ArticleTextBlockForm, DEFAULT_TEXT_BLOCK } from '~/components/forms/article-text-block';
import { ReactFormDnDField, type ReactFormDreggableRenderProps } from '~/components/react-form-dnd';

import {
  FormSection,
  FormSectionActions,
  FormSectionContent,
  FormSectionDrag,
} from '~/components/form-section';

// local modules
import { buttons as buttonsCn } from './upsert-tutorial.module.scss';

type BlockItemProps = ReactFormDreggableRenderProps<
  UpdateTutorialVariables,
  `translations.${number}.blocks`
>;

const BlockItem: FC<BlockItemProps> = props => {
  const { t: cmsT } = useTranslation('cms');
  const { closeModal, modalOpened, openModal } = useModalState();
  const handleRemove = useCallback(() => props.remove(props.index), [props.remove, props.index]);

  const handleSubmit = useCallback(
    (values: ArticleBlock) => {
      props.update(props.index, values);
      closeModal();
    },
    [closeModal, props.update, props.index],
  );

  return (
    <>
      <FormSection {...props.draggableProps} ref={props.innerRef}>
        <FormSectionDrag {...props.dragHandleProps} />
        <FormSectionContent>
          <AnyBlock block={props.field} />
        </FormSectionContent>
        <FormSectionActions onClose={handleRemove} onEdit={openModal} />
      </FormSection>

      <Modal
        onClose={closeModal}
        opened={modalOpened}
        title={cmsT('Adding text block')}
        widthType="medium"
      >
        {props.field.type === 'text' ? (
          <ArticleTextBlockForm defaultValues={props.field} onSubmit={handleSubmit} />
        ) : props.field.type === 'code' ? (
          <ArticleCodeBlockForm defaultValues={props.field} onSubmit={handleSubmit} />
        ) : null}
      </Modal>
    </>
  );
};

interface UpsertTutorialFormBlocksProps {
  name: `translations.${number}.blocks`;
  control: Control<UpdateTutorialVariables>;
}

export const UpsertTutorialFormBlocks: FC<UpsertTutorialFormBlocksProps> = props => {
  const { t: cmsT } = useTranslation('cms');

  const [modalType, updateModalType] = useState<ArticleBlock['type'] | undefined>(undefined);
  const blocksArray = useFieldArray({ control: props.control, name: props.name });

  const addBlock = useCallback(
    (block: ArticleBlock) => {
      blocksArray.append(block);
      updateModalType(undefined);
    },
    [blocksArray.append],
  );

  const closeModal = useCallback(() => updateModalType(undefined), []);
  const handleAddTextBlockClick = useCallback(() => updateModalType('text'), []);
  const handleAddCodeBlockClick = useCallback(() => updateModalType('code'), []);

  return (
    <div>
      <Heading as="h3" className="mb-4" size="md">
        {cmsT('Blocks')}
      </Heading>

      {blocksArray.fields.length ? null : <EmptyText>No blocks</EmptyText>}

      <ReactFormDnDField control={props.control} fieldArray={blocksArray}>
        {draggableProps => <BlockItem {...draggableProps} control={props.control} />}
      </ReactFormDnDField>

      <div className={buttonsCn}>
        <Button onClick={handleAddTextBlockClick} variant="outline">
          {cmsT('Add text block')}
        </Button>

        <Button onClick={handleAddCodeBlockClick} variant="outline">
          {cmsT('Add code block')}
        </Button>
      </div>

      <Modal
        onClose={closeModal}
        opened={modalType === 'text'}
        title={cmsT('Adding text block')}
        widthType="wide"
      >
        <ArticleTextBlockForm defaultValues={DEFAULT_TEXT_BLOCK} onSubmit={addBlock} />
      </Modal>

      <Modal
        onClose={closeModal}
        opened={modalType === 'code'}
        title={cmsT('Adding code block')}
        widthType="wide"
      >
        <ArticleCodeBlockForm defaultValues={DEFAULT_CODE_BLOCK} onSubmit={addBlock} />
      </Modal>
    </div>
  );
};
