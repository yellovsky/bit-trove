import type { Editor } from '@tiptap/react';
import type { FC } from 'react';

import { getShortcutKey, isMarkInSchema } from '../lib';
import {
  getFormattedMarkName,
  isMarkActive,
  isMarkButtonDisabled,
  type Mark,
  markIcons,
  markShortcutKeys,
  shouldShowMarkButton,
  toggleMark,
} from '../lib/mark';
import { useTiptapEditor } from '../model/hooks/use-tiptap-editor';
import { ToolbarButton } from './ToolbarButton';

/* -------------------------------------------------------------------------------------------------
 * MarkButton
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'MarkButton';

interface MarkButtonProps extends Omit<React.ComponentProps<typeof ToolbarButton>, 'type'> {
  /**
   * The type of mark to toggle
   */
  type: Mark;

  /**
   * Optional editor instance. If not provided, will use editor from context
   */
  editor?: Editor | null;

  /**
   * Display text for the button (optional)
   */
  text?: string;

  /**
   * Whether this button should be hidden when the mark is not available
   */
  hideWhenUnavailable?: boolean;
}

const useMarkState = (editor: Editor | null, type: Mark, disabled = false) => {
  const markInSchema = isMarkInSchema(type, editor);
  const isDisabled = isMarkButtonDisabled(editor, type, disabled);
  const isActive = isMarkActive(editor, type);

  const Icon = markIcons[type];
  const shortcutKeys = markShortcutKeys[type];
  const formattedName = getFormattedMarkName(type);

  return { formattedName, Icon, isActive, isDisabled, markInSchema, shortcutKeys };
};

const MarkButton: FC<MarkButtonProps> = ({
  editor: providedEditor,
  type,
  text,
  hideWhenUnavailable = false,
  className = '',
  disabled,
  onClick,
  children,
  ...buttonProps
}) => {
  const editor = useTiptapEditor(providedEditor);

  const { markInSchema, isDisabled, isActive, Icon, shortcutKeys, formattedName } = useMarkState(
    editor,
    type,
    disabled
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented && !isDisabled && editor) toggleMark(editor, type);
  };

  const show = shouldShowMarkButton({ editor, hideWhenUnavailable, markInSchema, type });

  if (!show || !editor || !editor.isEditable) return null;

  const tooltip = [formattedName, shortcutKeys?.map((s) => getShortcutKey(s).symbol).join(' ')]
    .filter(Boolean)
    .join(' ');

  return (
    <ToolbarButton
      aria-label={formattedName}
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
          <Icon />
          {text && <span>{text}</span>}
        </>
      )}
    </ToolbarButton>
  );
};

MarkButton.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { MarkButton };
export type { MarkButtonProps };
