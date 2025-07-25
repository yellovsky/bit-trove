import type { Editor } from '@tiptap/react';
import type { ComponentProps, FC, MouseEventHandler } from 'react';

import { getShortcutKey } from '../lib';
import { type HistoryAction, useHistoryAction } from '../lib/history';
import { useTiptapEditor } from '../model/hooks/use-tiptap-editor';
import { ToolbarButton } from './ToolbarButton';

/* -------------------------------------------------------------------------------------------------
 * UndoRedoButton
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'UndoRedoButton';

interface UndoRedoButtonProps extends ComponentProps<typeof ToolbarButton> {
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

/**
 * Button component for triggering undo/redo actions in a TipTap editor.
 */
const UndoRedoButton: FC<UndoRedoButtonProps> = (props) => {
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
      icon
      onClick={handleClick}
      tabIndex={-1}
      tooltip={tooltip}
      {...buttonProps}
    >
      {children || (
        <>
          <Icon />
          {text && <span>{text}</span>}
        </>
      )}
    </ToolbarButton>
  );
};

UndoRedoButton.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { UndoRedoButton };
export type { UndoRedoButtonProps };
