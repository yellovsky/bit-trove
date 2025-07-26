import { useAtomValue } from 'jotai';
import { CodeIcon } from 'lucide-react';
import { type ComponentProps, type FC, type ReactNode, useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

import { Button } from '@repo/ui/components/Button';
import { colorSchemeAtom } from '@repo/ui/lib/color-scheme-atom';

import { cn } from '../lib/utils';

/* -------------------------------------------------------------------------------------------------
 * CodeBlockHolder
 * -----------------------------------------------------------------------------------------------*/
const CODE_BLOCK_HOLDER_NAME = 'CodeBlockHolder';

type CodeBlockHolderProps = ComponentProps<'div'>;

const CodeBlockHolder: FC<CodeBlockHolderProps> = ({ className, ...rest }) => (
  <div className={cn('mb-4 whitespace-pre rounded-default border border-border', className)} {...rest} />
);

CodeBlockHolder.displayName = CODE_BLOCK_HOLDER_NAME;

/* -------------------------------------------------------------------------------------------------
 * CodeBlockTitle
 * -----------------------------------------------------------------------------------------------*/
const CODE_BLOCK_TITLE_NAME = 'CodeBlockTitle';

type CodeBlockTitleProps = ComponentProps<'div'> & {
  onCopy?: () => void;
  copied?: boolean;
  icon?: ReactNode;
};

const CodeBlockTitle: FC<CodeBlockTitleProps> = ({ icon, children, onCopy, copied, className, ...rest }) => (
  <div
    className={cn(
      'flex items-center gap-2 rounded-t-default border-b bg-muted/30 px-4 py-2 font-medium text-gray-12 text-xs',
      className
    )}
    {...rest}
  >
    <div className="[&_svg:not([class*='size-'])]:size-4">{icon || <CodeIcon className="size-4" />}</div>

    <div className="flex min-w-0 flex-1 items-center gap-2">
      {children && <span className="truncate font-mono text-gray-11">{children}</span>}
    </div>

    {onCopy && (
      <Button aria-label="Copy code" onClick={onCopy} size="sm" tabIndex={-1} type="button" variant="ghost">
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    )}
  </div>
);

CodeBlockTitle.displayName = CODE_BLOCK_TITLE_NAME;

/* -------------------------------------------------------------------------------------------------
 * CodeBlockContent
 * -----------------------------------------------------------------------------------------------*/
const CODE_BLOCK_CONTENT_NAME = 'CodeBlockContent';

type CodeBlockContentProps = ComponentProps<'div'> & {
  rootPadding?: boolean;
  withBg?: boolean;
};

const CodeBlockContent: FC<CodeBlockContentProps> = ({ className, withBg, rootPadding, ...rest }) => (
  <div
    className={cn(
      rootPadding && 'rounded-b-default px-6 py-5',
      !rootPadding && '[&>pre]:rounded-b-default [&>pre]:px-6 [&>pre]:py-5',
      withBg && '[&>pre]:bg-white dark:[&>pre]:bg-[#24292f]',
      className
    )}
    {...rest}
  />
);

CodeBlockContent.displayName = CODE_BLOCK_CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * CodeBlock
 * -----------------------------------------------------------------------------------------------*/
const CODE_BLOCK_NAME = 'CodeBlock';

interface CodeBlockProps {
  language: string;
  children: string;
  fileName?: string;
  showCopyButton?: boolean;
  icon?: ReactNode;
}

const CodeBlock: FC<CodeBlockProps> = (props) => {
  const { language, children, fileName, showCopyButton = true, icon } = props;
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState(false);
  const colorScheme = useAtomValue(colorSchemeAtom);

  useEffect(() => {
    const fn = () =>
      codeToHtml(children, {
        lang: language,
        theme: colorScheme === 'dark' ? 'github-dark' : 'github-light',
      }).then(setHtml);
    fn();
  }, [children, language, colorScheme]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="mb-4 whitespace-pre rounded-default border border-border">
      <CodeBlockTitle copied={copied} icon={icon} onCopy={showCopyButton ? handleCopy : undefined}>
        {fileName}
      </CodeBlockTitle>

      {html ? (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: it's a code block
        <CodeBlockContent dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <CodeBlockContent withBg>
          <pre>
            <code>{children}</code>
          </pre>
        </CodeBlockContent>
      )}
    </div>
  );
};

CodeBlock.displayName = CODE_BLOCK_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { CodeBlock, CodeBlockContent, CodeBlockHolder, CodeBlockTitle };
export type { CodeBlockProps, CodeBlockContentProps, CodeBlockHolderProps, CodeBlockTitleProps };
