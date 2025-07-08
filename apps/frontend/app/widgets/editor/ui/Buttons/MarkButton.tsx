import { type Editor, isNodeSelection } from '@tiptap/react';
import {
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
} from 'lucide-react';
import type { FC } from 'react';

import { getShortcutKey } from '../../lib';
import { isMarkInSchema } from '../../lib';
import { useTiptapEditor } from '../../model/hooks/use-tiptap-editor';
import { ToolbarButton } from '../Toolbar/ToolbarButton';

export type Mark = 'bold' | 'italic' | 'strike' | 'code' | 'underline' | 'superscript' | 'subscript';

export interface MarkButtonProps extends Omit<React.ComponentProps<typeof ToolbarButton>, 'type'> {
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

export const markIcons = {
  bold: BoldIcon,
  code: Code2Icon,
  italic: ItalicIcon,
  strike: StrikethroughIcon,
  subscript: SubscriptIcon,
  superscript: SuperscriptIcon,
  underline: UnderlineIcon,
};

export const markShortcutKeys: Partial<Record<Mark, string[]>> = {
  bold: ['mod', 'B'],
  code: ['mod', 'E'],
  italic: ['mod', 'I'],
  strike: ['mod', 'Shift', 'S'],
  subscript: ['mod', ','],
  superscript: ['mod', '.'],
  underline: ['mod', 'U'],
};

export const canToggleMark = (editor: Editor | null, type: Mark): boolean => {
  if (!editor) return false;

  try {
    return editor.can().toggleMark(type);
  } catch {
    return false;
  }
};

export const isMarkActive = (editor: Editor | null, type: Mark): boolean => {
  if (!editor) return false;
  return editor.isActive(type);
};

export const toggleMark = (editor: Editor | null, type: Mark): void => {
  if (!editor) return;
  editor.chain().focus().toggleMark(type).run();
};

export const isMarkButtonDisabled = (editor: Editor | null, type: Mark, userDisabled = false): boolean => {
  if (!editor) return true;
  if (userDisabled) return true;
  if (editor.isActive('codeBlock')) return true;
  if (!canToggleMark(editor, type)) return true;
  return false;
};

export const shouldShowMarkButton = (params: {
  editor: Editor | null;
  type: Mark;
  hideWhenUnavailable: boolean;
  markInSchema: boolean;
}): boolean => {
  const { editor, type, hideWhenUnavailable, markInSchema } = params;
  if (!markInSchema || !editor) return false;
  if (hideWhenUnavailable && (isNodeSelection(editor.state.selection) || !canToggleMark(editor, type))) return false;
  return true;
};

export const getFormattedMarkName = (type: Mark): string => type.charAt(0).toUpperCase() + type.slice(1);

export const useMarkState = (editor: Editor | null, type: Mark, disabled = false) => {
  const markInSchema = isMarkInSchema(type, editor);
  const isDisabled = isMarkButtonDisabled(editor, type, disabled);
  const isActive = isMarkActive(editor, type);

  const Icon = markIcons[type];
  const shortcutKeys = markShortcutKeys[type];
  const formattedName = getFormattedMarkName(type);

  return { formattedName, Icon, isActive, isDisabled, markInSchema, shortcutKeys };
};

export const MarkButton: FC<MarkButtonProps> = ({
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
      isActive={isActive}
      onClick={handleClick}
      tabIndex={-1}
      tooltip={tooltip}
      {...buttonProps}
    >
      {children || (
        <>
          <Icon strokeWidth={isActive ? 2 : 1} />
          {text && <span>{text}</span>}
        </>
      )}
    </ToolbarButton>
  );
};

MarkButton.displayName = 'MarkButton';
