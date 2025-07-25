import type { Editor } from '@tiptap/react';
import { TextQuoteIcon } from 'lucide-react';
import type { ComponentProps, FC, MouseEvent } from 'react';

import { getShortcutKey, isNodeInSchema } from '../lib';
import {
  canToggleBlockquote,
  isBlockquoteActive,
  isBlockquoteButtonDisabled,
  shouldShowBlockquoteButton,
  toggleBlockquote,
} from '../lib/blockquote';
import { useEditorSync } from '../model/hooks/use-editor-sync';
import { useTiptapEditor } from '../model/hooks/use-tiptap-editor';
import { ToolbarButton } from './ToolbarButton';

/* -------------------------------------------------------------------------------------------------
 * BlockquoteButton
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'BlockquoteButton';

interface BlockquoteButtonProps extends ComponentProps<typeof ToolbarButton> {
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

const useBlockquoteState = (editor: Editor | null, disabled = false, hideWhenUnavailable = false) => {
  const nodeInSchema = useEditorSync(editor, (e) => isNodeInSchema('blockquote', e), false);
  const canToggle = useEditorSync(editor, (e) => canToggleBlockquote(e), false);
  const isDisabled = useEditorSync(editor, (e) => isBlockquoteButtonDisabled(e, canToggle, disabled), false);
  const isActive = useEditorSync(editor, (e) => isBlockquoteActive(e), false);

  const shouldShow = useEditorSync(
    editor,
    (e) => shouldShowBlockquoteButton({ canToggle, editor: e, hideWhenUnavailable, nodeInSchema }),
    false
  );

  const handleToggle = () => (!isDisabled && editor ? toggleBlockquote(editor) : false);

  const shortcutKeys = ['mod', 'B'];
  const label = 'Blockquote';

  return { canToggle, handleToggle, isActive, isDisabled, label, nodeInSchema, shortcutKeys, shouldShow };
};

const BlockquoteButton: FC<BlockquoteButtonProps> = ({
  editor: providedEditor,
  text,
  hideWhenUnavailable = false,
  disabled,
  onClick,
  children,
  ...buttonProps
}) => {
  const editor = useTiptapEditor(providedEditor);

  const { isDisabled, isActive, shouldShow, handleToggle, shortcutKeys, label } = useBlockquoteState(
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
          <TextQuoteIcon />
          {text && <span>{text}</span>}
        </>
      )}
    </ToolbarButton>
  );
};

BlockquoteButton.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { BlockquoteButton };
export type { BlockquoteButtonProps };
