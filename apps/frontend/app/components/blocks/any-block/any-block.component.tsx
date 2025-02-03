// global modules
import type { ArticleBlock } from '@repo/api-models';
import clsx from 'clsx';
import type { FC } from 'react';

// common modules
import { CodeBlock } from '~/components/blocks/code-block';
import { TextBlock } from '~/components/blocks/text-block';
import { BlockSubtitle, BlockTitle } from '~/components/blocks/block-title';

// local modules
import { holder as holderCn } from './any-block.module.scss';

interface AnyBlockProps {
  className?: string;
  block: ArticleBlock;
}

const renderBlock = (block: ArticleBlock) => {
  switch (block.type) {
    case 'code':
      return <CodeBlock block={block} />;

    case 'text':
      return <TextBlock block={block} />;
    default:
      return null;
  }
};

export const AnyBlock: FC<AnyBlockProps> = ({ block, className }) => {
  const content = renderBlock(block);

  return !content ? null : (
    <div className={clsx(className, holderCn)}>
      <BlockTitle block={block} />
      <BlockSubtitle block={block} />

      {content}
    </div>
  );
};
