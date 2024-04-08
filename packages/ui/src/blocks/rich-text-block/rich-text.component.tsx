// global modules
import { addOpacityToColor } from '@bit-trove/utils/set-color-alpha';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import type { RichTextBlock as RichTextBlockType } from '@bit-trove/api-models/block';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import type { ComponentProps, FC } from 'react';

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
      <SyntaxHighlighter {...rest} language={match[1]} PreTag="div" style={dracula}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );

    if (!attrsHash?.file) return codeBlock;

    const preStyle = dracula['pre[class*="language-"]'] || {};

    const panelStyle = {
      borderRadius: preStyle.borderRadius,
      color: preStyle.color,

      background:
        typeof preStyle.background !== 'string'
          ? undefined
          : addOpacityToColor(preStyle.background, 0.8),
    };

    const titleStyle = {
      paddingLeft: preStyle.padding,
      paddingright: preStyle.padding,
      paddingTop: preStyle.padding,
    };

    return (
      <div style={panelStyle}>
        <div style={titleStyle}>{attrsHash.file}</div>
        <SyntaxHighlighter {...rest} language={match[1]} PreTag="div" style={dracula}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    );
  },
};

export const RichTextBlock: FC<RichTextProps> = ({ block }) => {
  return (
    <section className={holderCn}>
      <Markdown components={components} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {block.body}
      </Markdown>
    </section>
  );
};
