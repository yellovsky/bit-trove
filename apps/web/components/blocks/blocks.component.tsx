// global modules
import type { FC } from 'react';
import type { Block } from '@repo/api-models/block';
import { RichTextBlock } from '@repo/ui/rich-text-block';

const renderBlock = (block: Block) => {
  switch (block.__component) {
    case 'blocks.rich-text-block':
      return <RichTextBlock key={block.id} block={block} />;
    default:
      return null;
  }
};

interface BlocksProps {
  blocks: Block[];
}

export const Blocks: FC<BlocksProps> = ({ blocks }) => blocks.map(renderBlock);
