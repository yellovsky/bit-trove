// global modules
import type { ArticleTextBlock } from '@repo/api-models';
import type { FC } from 'react';

// common modules
import { DangerHTMLText } from '~/components/danger-html-text';

interface TextBlockProps {
  block: ArticleTextBlock;
}

export const TextBlock: FC<TextBlockProps> = ({ block }) =>
  block.content.type === 'html' ? (
    <DangerHTMLText html={block.content.text} />
  ) : (
    <DangerHTMLText md={block.content.text} />
  );
