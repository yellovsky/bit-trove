import { type Editor, isNodeSelection } from '@tiptap/react';

export const canToggleCallout = (editor: Editor | null): boolean => {
  if (!editor) return false;

  try {
    return editor.can().setCallout();
  } catch {
    return false;
  }
};

export const isCalloutActive = (editor: Editor | null): boolean => {
  if (!editor) return false;
  return editor.isActive('callout');
};

export const toggleCallout = (editor: Editor | null): boolean => {
  if (!editor) return false;
  return isCalloutActive(editor) ? editor.commands.unsetCallout() : editor.commands.setCallout();
};

export const isCalloutButtonDisabled = (editor: Editor | null, canToggle: boolean, userDisabled = false): boolean =>
  !editor || userDisabled || !canToggle;

export const shouldShowCalloutButton = (params: {
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
