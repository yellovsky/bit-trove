import { type Editor, isNodeSelection } from '@tiptap/react';
import { CodeSquareIcon } from 'lucide-react';
import type { ComponentProps, FC, MouseEvent } from 'react';

import { getShortcutKey } from '../../lib';
import { isNodeInSchema } from '../../lib';
import { useEditorSync } from '../../model/hooks/use-editor-sync';
import { useTiptapEditor } from '../../model/hooks/use-tiptap-editor';
import { ToolbarButton } from '../Toolbar/ToolbarButton';

export interface CodeBlockButtonProps extends ComponentProps<typeof ToolbarButton> {
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

export const canToggleCodeBlock = (editor: Editor | null): boolean => {
  if (!editor) return false;

  try {
    return editor.can().toggleNode('codeBlock', 'paragraph');
  } catch {
    return false;
  }
};

export const isCodeBlockActive = (editor: Editor | null): boolean => (!editor ? false : editor.isActive('codeBlock'));

export const toggleCodeBlock = (editor: Editor | null): boolean =>
  !editor ? false : editor.chain().focus().toggleNode('codeBlock', 'paragraph').run();

export const isCodeBlockButtonDisabled = (editor: Editor | null, canToggle: boolean, userDisabled = false): boolean =>
  !editor || userDisabled || !canToggle;

export const shouldShowCodeBlockButton = (params: {
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

export const useCodeBlockState = (editor: Editor | null, disabled = false, hideWhenUnavailable = false) => {
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

export const CodeBlockButton: FC<CodeBlockButtonProps> = ({
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
      isActive={isActive}
      onClick={handleClick}
      tabIndex={-1}
      tooltip={tooltip}
      {...buttonProps}
    >
      {children || (
        <>
          <CodeSquareIcon strokeWidth={isActive ? 2 : 1} />
          {text && <span>{text}</span>}
        </>
      )}
    </ToolbarButton>
  );
};

CodeBlockButton.displayName = 'CodeBlockButton';
