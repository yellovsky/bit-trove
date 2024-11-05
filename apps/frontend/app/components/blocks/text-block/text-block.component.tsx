// global modules
import type { ArticleTextBlock } from '@repo/api-models';
import type { FC } from 'react';

// common modules
import { DangerHTMLText } from '~/components/danger-html-text';

interface TextBlockProps {
  block: ArticleTextBlock;
}

export const TextBlock: FC<TextBlockProps> = ({ block }) => {
  const html = 'html' in block.content ? block.content.html : undefined;
  const md = 'md' in block.content ? block.content.md : undefined;

  return (
    <div>{html ? <DangerHTMLText html={html} /> : md ? <DangerHTMLText md={md} /> : null}</div>
  );
};
