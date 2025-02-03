// global modules
import type { ArticleBlock } from '@repo/api-models';
import type { FC } from 'react';

// common modules
import { Heading } from '~/components/heading';
import { slugify } from '~/utils/slugify';

interface BlockTitleProps {
  className?: string;
  block: ArticleBlock;
}

export const BlockTitle: FC<BlockTitleProps> = ({ block }) => {
  const id = block.title ? slugify(block.title) : undefined;

  return !block.title ? null : (
    <Heading as="h2" dangerouslySetInnerHTML={{ __html: block.title }} id={id} size="md" />
  );
};

export const BlockSubtitle: FC<BlockTitleProps> = ({ block }) => {
  const id = block.subtitle ? slugify(block.subtitle) : undefined;

  return !block.subtitle ? null : (
    <Heading as="h3" dangerouslySetInnerHTML={{ __html: block.subtitle }} id={id} size="sm" />
  );
};
