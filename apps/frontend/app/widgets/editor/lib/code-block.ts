import { type Editor, isNodeSelection } from '@tiptap/react';

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
