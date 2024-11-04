// global modules
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { ArticleCodeBlock } from '@repo/api-models';
import type { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface CodeBlockProps {
  block: ArticleCodeBlock;
}

export const CodeBlock: FC<CodeBlockProps> = ({ block }) => {
  return (
    <>
      {block.content.variants.map(variant => (
        <SyntaxHighlighter key={variant.language} language="ts" style={a11yDark}>
          {variant.text}
        </SyntaxHighlighter>
      ))}
    </>
  );
};
