// global modules
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { ArticleCodeBlock } from '@repo/api-models';
import type { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// local modules
import { codeBlock as codeBlockCn } from './code-block.module.scss';

interface CodeBlockProps {
  block: ArticleCodeBlock;
}

export const CodeBlock: FC<CodeBlockProps> = ({ block }) => (
  <div className={codeBlockCn}>
    {block.content.variants.map(variant => (
      <SyntaxHighlighter key={variant.language} language={variant.language} style={a11yDark}>
        {variant.text}
      </SyntaxHighlighter>
    ))}
  </div>
);
