// global modules
import type { FC } from 'react';
import type { Block } from '@bit-trove/api-models/block';
import { RichTextBlock } from '@bit-trove/ui/rich-text-block';

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
