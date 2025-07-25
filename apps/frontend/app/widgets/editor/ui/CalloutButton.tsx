import type { Editor } from '@tiptap/react';
import { BoxIcon } from 'lucide-react';
import type { ComponentProps, FC, MouseEvent } from 'react';

import { getShortcutKey, isNodeInSchema } from '../lib';
import {
  canToggleCallout,
  isCalloutActive,
  isCalloutButtonDisabled,
  shouldShowCalloutButton,
  toggleCallout,
} from '../lib/callout';
import { useEditorSync } from '../model/hooks/use-editor-sync';
import { useTiptapEditor } from '../model/hooks/use-tiptap-editor';
import { ToolbarButton } from './ToolbarButton';

/* -------------------------------------------------------------------------------------------------
 * CalloutButton
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'CalloutButton';

interface CalloutButtonProps extends ComponentProps<typeof ToolbarButton> {
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

const useCalloutState = (editor: Editor | null, disabled = false, hideWhenUnavailable = false) => {
  const nodeInSchema = useEditorSync(editor, (e) => isNodeInSchema('callout', e), false);
  const canToggle = useEditorSync(editor, (e) => canToggleCallout(e), false);
  const isDisabled = useEditorSync(editor, (e) => isCalloutButtonDisabled(e, canToggle, disabled), false);
  const isActive = useEditorSync(editor, (e) => isCalloutActive(e), false);

  const shouldShow = useEditorSync(
    editor,
    (e) => shouldShowCalloutButton({ canToggle, editor: e, hideWhenUnavailable, nodeInSchema }),
    false
  );

  const handleToggle = () => (!isDisabled && editor ? toggleCallout(editor) : false);

  const shortcutKeys = ['mod', 'B'];
  const label = 'Callout';

  return { canToggle, handleToggle, isActive, isDisabled, label, nodeInSchema, shortcutKeys, shouldShow };
};

const CalloutButton: FC<CalloutButtonProps> = ({
  editor: providedEditor,
  text,
  hideWhenUnavailable = false,
  disabled,
  onClick,
  children,
  ...buttonProps
}) => {
  const editor = useTiptapEditor(providedEditor);

  const { isDisabled, isActive, shouldShow, handleToggle, shortcutKeys, label } = useCalloutState(
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
          <BoxIcon />
          {text && <span>{text}</span>}
        </>
      )}
    </ToolbarButton>
  );
};

CalloutButton.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { CalloutButton };
export type { CalloutButtonProps };
