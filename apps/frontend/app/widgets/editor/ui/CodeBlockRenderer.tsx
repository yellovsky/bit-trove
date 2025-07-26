import { NodeViewContent, type NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { CodeIcon } from 'lucide-react';
import type { FC } from 'react';

import { CodeBlockContent, CodeBlockHolder, CodeBlockTitle } from '@repo/ui/components/CodeBlock';
import { IconButton } from '@repo/ui/components/IconButton';
import * as Popover from '@repo/ui/components/Popover';
import * as ProgrammingLanguageIcon from '@repo/ui/components/ProgrammingLanguageIcon';
import { TextInput } from '@repo/ui/components/TextInput';

/* -------------------------------------------------------------------------------------------------
 * IconOption
 * -----------------------------------------------------------------------------------------------*/
const ICON_OPTION_NAME = 'IconOption';

const LANGUAGE_TYPES = ['bash', 'css', 'html', 'javascript', 'jsx', 'typescript'] as const;

interface IconOptionProps {
  type: (typeof LANGUAGE_TYPES)[number];
  updateAttributes: (attributes: Record<string, unknown>) => void;
}

const IconOption: FC<IconOptionProps> = ({ type, updateAttributes }) => {
  const Icon = ProgrammingLanguageIcon.getLanguageIcon(type);

  return !Icon ? null : (
    <IconButton
      aria-label={`Set ${type} code block`}
      onClick={() => updateAttributes({ language: type })}
      type="button"
      variant="soft"
    >
      <Icon />
    </IconButton>
  );
};

IconOption.displayName = ICON_OPTION_NAME;

/* -------------------------------------------------------------------------------------------------
 * CodeBlockRenderer
 * -----------------------------------------------------------------------------------------------*/
const CODE_BLOCK_RENDERER_NAME = 'CodeBlockRenderer';

interface CodeBlockRendererProps extends NodeViewProps {
  className?: string;
}

const CodeBlockRenderer: FC<CodeBlockRendererProps> = ({ className, ...rest }) => {
  const SelectedIcon = ProgrammingLanguageIcon.getLanguageIcon(rest.node.attrs.language) || CodeIcon;

  const codeIcon = (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButton size="sm" variant="ghost">
          <SelectedIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content className="flex flex-col p-0">
        {LANGUAGE_TYPES.map((type) => (
          <IconOption key={type} type={type} updateAttributes={rest.updateAttributes} />
        ))}
      </Popover.Content>
    </Popover.Root>
  );

  return (
    <NodeViewWrapper>
      <CodeBlockHolder className={className}>
        <CodeBlockTitle icon={codeIcon}>
          <TextInput
            onChange={(e) => rest.updateAttributes({ fileName: e.target.value })}
            placeholder="File name"
            value={rest.node.attrs.fileName}
          />
        </CodeBlockTitle>
        <CodeBlockContent className="bg-[#24292f] text-white" rootPadding>
          <NodeViewContent />
        </CodeBlockContent>
      </CodeBlockHolder>
    </NodeViewWrapper>
  );
};

CodeBlockRenderer.displayName = CODE_BLOCK_RENDERER_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = CodeBlockRenderer;

export {
  Root,
  //
  CodeBlockRenderer,
};

export type { CodeBlockRendererProps };
