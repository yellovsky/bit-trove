import type { Editor } from '@tiptap/react';
import { CodeSquareIcon } from 'lucide-react';
import type { ComponentProps, FC, MouseEvent } from 'react';

import { getShortcutKey, isNodeInSchema } from '../lib';
import {
  canToggleCodeBlock,
  isCodeBlockActive,
  isCodeBlockButtonDisabled,
  shouldShowCodeBlockButton,
  toggleCodeBlock,
} from '../lib/code-block';
import { useEditorSync } from '../model/hooks/use-editor-sync';
import { useTiptapEditor } from '../model/hooks/use-tiptap-editor';
import { ToolbarButton } from './ToolbarButton';

/* -------------------------------------------------------------------------------------------------
 * CodeBlockButton
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'CodeBlockButton';

interface CodeBlockButtonProps extends ComponentProps<typeof ToolbarButton> {
  /**
   * The TipTap editor instance.
   */
  editor?: Editor | null;

  /**
   * Optional text to display alongside the icon.
   */
  text?: string;

  /**
   * Whether the button should hide when the node is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean;
}

const useCodeBlockState = (editor: Editor | null, disabled = false, hideWhenUnavailable = false) => {
  const nodeInSchema = useEditorSync(editor, (e) => isNodeInSchema('codeBlock', e), false);

  const canToggle = useEditorSync(editor, (e) => canToggleCodeBlock(e), false);
  const isDisabled = useEditorSync(editor, (e) => isCodeBlockButtonDisabled(e, canToggle, disabled), false);
  const isActive = useEditorSync(editor, (e) => isCodeBlockActive(e), false);

  const shouldShow = useEditorSync(
    editor,
    (e) => shouldShowCodeBlockButton({ canToggle, editor: e, hideWhenUnavailable, nodeInSchema }),
    false
  );

  const handleToggle = () => (!isDisabled && editor ? toggleCodeBlock(editor) : false);

  const shortcutKeys = ['mod', 'C'];
  const label = 'Code Block';

  return { canToggle, handleToggle, isActive, isDisabled, label, nodeInSchema, shortcutKeys, shouldShow };
};

const CodeBlockButton: FC<CodeBlockButtonProps> = ({
  editor: providedEditor,
  text,
  hideWhenUnavailable = false,
  disabled,
  onClick,
  children,
  ...buttonProps
}) => {
  const editor = useTiptapEditor(providedEditor);

  const { isDisabled, isActive, shouldShow, handleToggle, shortcutKeys, label } = useCodeBlockState(
    editor,
    disabled,
    hideWhenUnavailable
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented && !isDisabled) handleToggle();
  };

  if (!shouldShow || !editor || !editor.isEditable) return null;

  const tooltip = [label, shortcutKeys?.map((s) => getShortcutKey(s).symbol).join(' ')].filter(Boolean).join(' ');

  return (
    <ToolbarButton
      aria-label={label}
      disabled={isDisabled}
      icon
      isActive={isActive}
      onClick={handleClick}
      tabIndex={-1}
      tooltip={tooltip}
      {...buttonProps}
    >
      {children || (
        <>
          <CodeSquareIcon />
          {text && <span>{text}</span>}
        </>
      )}
    </ToolbarButton>
  );
};

CodeBlockButton.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { CodeBlockButton };
export type { CodeBlockButtonProps };
