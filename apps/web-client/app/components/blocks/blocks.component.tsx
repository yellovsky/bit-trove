// global modules
import type { Block } from '@repo/api-models/block';
import type { FC } from 'react';
import { RichTextBlock } from '@repo/ui/rich-text-block';

const renderBlock = (block: Block) => {
  switch (block.__component) {
    case 'blocks.rich-text-block':
      return <RichTextBlock block={block} key={block.id} />;
    default:
      return null;
  }
};

interface BlocksProps {
  blocks: Block[];
}

export const Blocks: FC<BlocksProps> = ({ blocks }) => blocks.map(renderBlock);
