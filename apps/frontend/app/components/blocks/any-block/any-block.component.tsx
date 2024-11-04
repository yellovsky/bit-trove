// global modules
import type { ArticleBlock } from '@repo/api-models';
import type { FC } from 'react';

// common modules
import { CodeBlock } from '~/components/blocks/code-block';
import { TextBlock } from '~/components/blocks/text-block';

interface AnyBlockProps {
  block: ArticleBlock;
}

export const AnyBlock: FC<AnyBlockProps> = ({ block }) => {
  switch (block.type) {
    case 'code':
      return <CodeBlock block={block} />;

    case 'text':
      return <TextBlock block={block} />;
    default:
      return null;
  }
};
