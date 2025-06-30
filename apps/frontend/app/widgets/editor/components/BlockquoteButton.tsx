import { type Editor, isNodeSelection } from '@tiptap/react';
import { TextQuoteIcon } from 'lucide-react';
import type { ComponentProps, FC, MouseEvent } from 'react';

import { useEditorSync } from '../hooks/use-editor-sync';
import { useTiptapEditor } from '../hooks/use-tiptap-editor';
import { getShortcutKey } from '../lib/get-shortcut-key';
import { isNodeInSchema } from '../lib/tiptap-utils';
import ToolbarButton from './ToolbarButton';

export interface BlockquoteButtonProps extends ComponentProps<typeof ToolbarButton> {
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

export const canToggleBlockquote = (editor: Editor | null): boolean => {
  if (!editor) return false;

  try {
    return editor.can().toggleWrap('blockquote');
  } catch {
    return false;
  }
};

export const isBlockquoteActive = (editor: Editor | null): boolean => {
  if (!editor) return false;
  return editor.isActive('blockquote');
};

export const toggleBlockquote = (editor: Editor | null): boolean => {
  if (!editor) return false;
  return editor.chain().focus().toggleWrap('blockquote').run();
};

export const isBlockquoteButtonDisabled = (editor: Editor | null, canToggle: boolean, userDisabled = false): boolean =>
  !editor || userDisabled || !canToggle;

export const shouldShowBlockquoteButton = (params: {
  editor: Editor | null;
  hideWhenUnavailable: boolean;
  nodeInSchema: boolean;
  canToggle: boolean;
}): boolean => {
  const { editor, hideWhenUnavailable, nodeInSchema, canToggle } = params;

  if (!nodeInSchema || !editor) return false;
  if (hideWhenUnavailable && (isNodeSelection(editor.state.selection) || !canToggle)) return false;
  return Boolean(editor?.isEditable);
};

export const useBlockquoteState = (editor: Editor | null, disabled = false, hideWhenUnavailable = false) => {
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

export const BlockquoteButton: FC<BlockquoteButtonProps> = ({
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
      isActive={isActive}
      onClick={handleClick}
      tabIndex={-1}
      tooltip={tooltip}
      {...buttonProps}
    >
      {children || (
        <>
          <TextQuoteIcon className="tiptap-button-icon" strokeWidth={isActive ? 2 : 1} />
          {text && <span className="tiptap-button-text">{text}</span>}
        </>
      )}
    </ToolbarButton>
  );
};

BlockquoteButton.displayName = 'BlockquoteButton';

export default BlockquoteButton;
