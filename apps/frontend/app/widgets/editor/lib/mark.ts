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

export type Mark = 'bold' | 'italic' | 'strike' | 'code' | 'underline' | 'superscript' | 'subscript';

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
