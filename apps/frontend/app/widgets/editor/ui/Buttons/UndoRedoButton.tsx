import type { Editor } from '@tiptap/react';
import { Redo2Icon, Undo2Icon } from 'lucide-react';
import type { ComponentProps, FC, MouseEventHandler } from 'react';

import { getShortcutKey } from '../../lib';
import { useEditorSync } from '../../model/hooks/use-editor-sync';
import { useTiptapEditor } from '../../model/hooks/use-tiptap-editor';
import { ToolbarButton } from '../Toolbar/ToolbarButton';

export type HistoryAction = 'undo' | 'redo';

/**
 * Props for the UndoRedoButton component.
 */
export interface UndoRedoButtonProps extends ComponentProps<typeof ToolbarButton> {
  /**
   * The TipTap editor instance.
   */
  editor?: Editor | null;

  /**
   * Optional text to display alongside the icon.
   */
  text?: string;

  /**
   * The history action to perform (undo or redo).
   */
  action: HistoryAction;
}

export const historyIcons = {
  redo: Redo2Icon,
  undo: Undo2Icon,
};

export const historyShortcutKeys: Partial<Record<HistoryAction, string[]>> = {
  redo: ['mod', 'shift', 'Z'],
  undo: ['mod', 'Z'],
};

export const historyActionLabels: Record<HistoryAction, string> = {
  redo: 'Redo',
  undo: 'Undo',
};

/**
 * Checks if a history action can be executed.
 *
 * @param editor The TipTap editor instance
 * @param action The history action to check
 * @returns Whether the action can be executed
 */
export function canExecuteHistoryAction(editor: Editor | null, action: HistoryAction): boolean {
  if (!editor) return false;
  return action === 'undo' ? editor.can().undo() : editor.can().redo();
}

/**
 * Executes a history action on the editor.
 *
 * @param editor The TipTap editor instance
 * @param action The history action to execute
 * @returns Whether the action was executed successfully
 */
export function executeHistoryAction(editor: Editor | null, action: HistoryAction): boolean {
  if (!editor) return false;
  const chain = editor.chain().focus();
  return action === 'undo' ? chain.undo().run() : chain.redo().run();
}

/**
 * Determines if a history action should be disabled.
 *
 * @param editor The TipTap editor instance
 * @param action The history action to check
 * @param userDisabled Whether the action is explicitly disabled by the user
 * @returns Whether the action should be disabled
 */
export function isHistoryActionDisabled(editor: Editor | null, action: HistoryAction, userDisabled = false): boolean {
  if (userDisabled) return true;
  return !canExecuteHistoryAction(editor, action);
}

/**
 * Hook that provides all the necessary state and handlers for a history action.
 *
 * @param editor The TipTap editor instance
 * @param action The history action to handle
 * @param disabled Whether the action is explicitly disabled
 * @returns Object containing state and handlers for the history action
 */
export function useHistoryAction(editor: Editor | null, action: HistoryAction, disabled = false) {
  const canExecute = useEditorSync(editor, (e) => canExecuteHistoryAction(e, action), false);
  const isDisabled = useEditorSync(editor, (e) => isHistoryActionDisabled(e, action, disabled), false);

  const handleAction = () => {
    if (!editor || isDisabled) return;
    executeHistoryAction(editor, action);
  };

  const Icon = historyIcons[action];
  const actionLabel = historyActionLabels[action];
  const shortcutKeys = historyShortcutKeys[action];

  return { actionLabel, canExecute, handleAction, Icon, isDisabled, shortcutKeys };
}

/**
 * Button component for triggering undo/redo actions in a TipTap editor.
 */
export const UndoRedoButton: FC<UndoRedoButtonProps> = (props) => {
  const { editor: providedEditor, action, text, disabled, onClick, children, ...buttonProps } = props;
  const editor = useTiptapEditor(providedEditor);
  const { isDisabled, handleAction, Icon, actionLabel, shortcutKeys } = useHistoryAction(editor, action, disabled);
  const tooltip = [actionLabel, shortcutKeys?.map((s) => getShortcutKey(s).symbol).join(' ')].filter(Boolean).join(' ');

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);
    if (!e.defaultPrevented && !disabled) handleAction();
  };

  if (!editor || !editor.isEditable) return null;

  return (
    <ToolbarButton
      aria-label={actionLabel}
      disabled={isDisabled}
      onClick={handleClick}
      tabIndex={-1}
      tooltip={tooltip}
      {...buttonProps}
    >
      {children || (
        <>
          <Icon strokeWidth={1} />
          {text && <span>{text}</span>}
        </>
      )}
    </ToolbarButton>
  );
};

UndoRedoButton.displayName = 'UndoRedoButton';
