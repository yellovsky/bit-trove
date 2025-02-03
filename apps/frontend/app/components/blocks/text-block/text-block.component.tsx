// global modules
import type { ArticleTextBlock } from '@repo/api-models';
import type { FC } from 'react';

// common modules
import { DangerHTMLText } from '~/components/danger-html-text';

interface TextBlockProps {
  block: ArticleTextBlock;
}

export const TextBlock: FC<TextBlockProps> = ({ block }) =>
  'html' in block.content ? (
    <DangerHTMLText html={block.content.html} />
  ) : 'md' in block.content ? (
    <DangerHTMLText md={block.content.md} />
  ) : null;
