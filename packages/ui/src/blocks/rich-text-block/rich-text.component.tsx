// global modules
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Markdown from 'react-markdown';
import type { ComponentProps, FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { RichTextBlock as RichTextBlockType } from '@bit-trove/api-models/block';

// local modules
import { holder as holderCn } from './rich-text.module.scss';

interface RichTextProps {
  block: RichTextBlockType;
}

const components: ComponentProps<typeof Markdown>['components'] = {
  // sorry =(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: ({ inline, className, children, ...rest }: any) => {
    const match = /language-(\w+)/.exec(className || '');

    return !inline && match ? (
      <SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...rest}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  },
};

export const RichTextBlock: FC<RichTextProps> = ({ block }) => {
  return (
    <section className={holderCn}>
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {block.body}
      </Markdown>
    </section>
  );
};
