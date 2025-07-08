import { useAtomValue } from 'jotai';
import { CodeIcon } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

import { Button } from '@repo/ui/components/Button';
import { colorSchemeAtom } from '@repo/ui/lib/color-scheme-atom';

/* -------------------------------------------------------------------------------------------------
 * CodeBlock
 * -----------------------------------------------------------------------------------------------*/
const CODE_BLOCK_NAME = 'CodeBlock';

interface CodeBlockProps {
  language: string;
  children: string;
  fileName?: string;
  showCopyButton?: boolean;
}

const CodeBlock: FC<CodeBlockProps> = (props) => {
  const { language, children, fileName, showCopyButton = true } = props;
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
    <div className="mb-4 whitespace-pre rounded-default border border-border ">
      <div className="flex items-center gap-2 rounded-t-default border-b bg-muted/30 px-4 py-2 font-medium text-gray-12 text-xs">
        <div>
          <CodeIcon className="size-4" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {fileName && (
            <span className="truncate font-mono text-gray-11" title={fileName}>
              {fileName}
            </span>
          )}
        </div>
        {showCopyButton && (
          <Button
            aria-label="Copy code"
            // className="ml-2 rounded px-2 py-0.5 font-medium text-gray-11 text-xs hover:bg-gray-10 focus:outline-none focus:ring-2 focus:ring-primary-7"
            onClick={handleCopy}
            size="sm"
            type="button"
            variant="dimmed"
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        )}
      </div>

      {html ? (
        <div
          className="[&>pre]:rounded-b-default [&>pre]:px-6 [&>pre]:py-5"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: it's a code block
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <div className="[&>pre]:rounded-b-default [&>pre]:bg-[#2e3440] [&>pre]:px-6 [&>pre]:py-5">
          <pre>
            <code>{children}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

CodeBlock.displayName = CODE_BLOCK_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { CodeBlock };
export type { CodeBlockProps };
