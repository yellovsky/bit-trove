import { type Editor, isNodeSelection } from '@tiptap/react';

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
