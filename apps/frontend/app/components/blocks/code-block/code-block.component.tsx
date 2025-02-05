// global modules
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import type { ArticleCodeBlock, CodeBlockVariant } from '@repo/api-models';
import { type FC, useCallback, useState } from 'react';

// common modules
import { Icon } from '~/components/icon';
import { IconButton } from '~/components/icon-button';

// local modules
import { LanguageTabs } from './code-block.language-tabs';

import {
  codeBlock as codeBlockCn,
  filename as filenameCn,
  header as headerCn,
} from './code-block.module.scss';

interface CodeBlockContentProps {
  variant: CodeBlockVariant;
  variants: CodeBlockVariant[];
  onSelectVariant(variant: CodeBlockVariant): void;
}

const CodeBlockContent: FC<CodeBlockContentProps> = props => {
  const copy = useCallback(() => {
    navigator.clipboard.writeText(props.variant.text);
  }, [props.variant.text]);

  return (
    <div className={codeBlockCn}>
      <div className={headerCn}>
        <div className={filenameCn}>{props.variant.filename}</div>
        <div>
          <LanguageTabs
            onSelectVariant={props.onSelectVariant}
            variant={props.variant}
            variants={props.variants}
          />
        </div>
        <div>
          <IconButton onClick={copy} variant="soft">
            <Icon type="copy" />
          </IconButton>
        </div>
      </div>
      <SyntaxHighlighter
        customStyle={{ background: 'none' }}
        language={props.variant.language}
        style={a11yDark}
      >
        {props.variant.text}
      </SyntaxHighlighter>
    </div>
  );
};

export interface CodeBlockProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const CodeBlock: FC<CodeBlockProps> = ({ block, className }) => {
  const [selectedVariant, updateSelectedVariant] = useState(() => block.content.variants.at(0));

  return (
    <div className={className}>
      {!selectedVariant ? null : (
        <CodeBlockContent
          onSelectVariant={updateSelectedVariant}
          variant={selectedVariant}
          variants={block.content.variants}
        />
      )}
    </div>
  );
};
