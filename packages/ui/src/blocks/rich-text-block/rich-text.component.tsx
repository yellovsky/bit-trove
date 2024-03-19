// global modules
import type { ComponentProps, FC } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { RichTextBlockragment } from '@repo/api-models/block';

// local modules
import { holder as holderCn } from './rich-text.module.scss';

interface RichTextProps {
  block: RichTextBlockragment;
}
const components: ComponentProps<typeof Markdown>['components'] = {
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
