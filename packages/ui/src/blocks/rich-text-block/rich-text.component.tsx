// global modules
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Markdown from 'react-markdown';
import type { ComponentProps, FC } from 'react';
import { addOpacityToColor } from '@bit-trove/utils/set-color-alpha';
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

    if (inline || !match) {
      return (
        <code className={className} {...rest}>
          {children}
        </code>
      );
    }

    const attrsHash = (className as string | undefined)?.split('|').reduce(
      (accum, raw) => {
        const [key, val] = raw.split(':').map((s) => s.trim());
        return key && val ? { ...accum, [key]: val } : accum;
      },
      {} as Record<string, string>
    );

    const codeBlock = (
      <SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...rest}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );

    if (!attrsHash?.file) return codeBlock;

    const preStyle = dracula['pre[class*="language-"]'] || {};

    const panelStyle = {
      color: preStyle.color,
      borderRadius: preStyle.borderRadius,

      background:
        typeof preStyle.background !== 'string'
          ? undefined
          : addOpacityToColor(preStyle.background, 0.8),
    };

    const titleStyle = {
      paddingTop: preStyle.padding,
      paddingLeft: preStyle.padding,
      paddingright: preStyle.padding,
    };

    console.log('dracula', dracula);
    return (
      <div style={panelStyle}>
        <div style={titleStyle}>{attrsHash.file}</div>
        <SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...rest}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
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
