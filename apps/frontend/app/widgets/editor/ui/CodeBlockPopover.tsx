import { CodeSquareIcon } from 'lucide-react';
import { type ComponentProps, type FC, useCallback } from 'react';

import { getShortcutKey } from '../lib';
import { useEditorSync } from '../model/hooks/use-editor-sync';
import { useTiptapEditor } from '../model/hooks/use-tiptap-editor';
import { ToolbarButton } from './ToolbarButton';

/* -------------------------------------------------------------------------------------------------
 * CodeBlockButton
 * -----------------------------------------------------------------------------------------------*/
const CODE_BLOCK_BUTTON_NAME = 'CodeBlockButton';

type CodeBlockButtonProps = ComponentProps<typeof ToolbarButton>;

const CodeBlockButton: FC<CodeBlockButtonProps> = (props) => {
  const { disabled, onClick, children, ...buttonProps } = props;
  const editor = useTiptapEditor();

  const canToggle = useEditorSync(
    editor,
    (e) => {
      if (!e) return false;
      try {
        return e.can().toggleNode('codeBlock', 'paragraph');
      } catch {
        return false;
      }
    },
    false
  );
  const isDisabled = useEditorSync(editor, (e) => !e || disabled || !canToggle, false);
  const isActive = useEditorSync(editor, (e) => e?.isActive('codeBlock') || false, false);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented && !isDisabled && editor) {
        editor.chain().focus().toggleNode('codeBlock', 'paragraph').run();
      }
    },
    [onClick, isDisabled, editor]
  );

  const shortcutKeys = ['mod', 'C'];
  const label = 'Code Block';

  if (!editor || !editor.isEditable) return null;

  const tooltip = [label, shortcutKeys?.map((s) => getShortcutKey(s).symbol).join(' ')].filter(Boolean).join(' ');

  return (
    <ToolbarButton
      aria-label={label}
      disabled={isDisabled}
      isActive={isActive}
      onClick={handleClick}
      tabIndex={-1}
      tooltip={tooltip}
      {...buttonProps}
    >
      {children || <CodeSquareIcon />}
    </ToolbarButton>
  );
};

CodeBlockButton.displayName = CODE_BLOCK_BUTTON_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { CodeBlockButton };

export type { CodeBlockButtonProps };
