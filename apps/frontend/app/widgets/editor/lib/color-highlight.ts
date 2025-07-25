import type { Node } from '@tiptap/pm/model';
import { type Editor, isNodeSelection } from '@tiptap/react';

import { findNodePosition, isEmptyNode } from './tiptap-utils';

export const HIGHLIGHT_COLORS = [
  {
    border: 'var(--tt-bg-color-contrast)',
    label: 'Default background',
    value: 'var(--tt-bg-color)',
  },
  {
    border: 'var(--tt-color-highlight-gray-contrast)',
    label: 'Gray background',
    value: 'var(--tt-color-highlight-gray)',
  },
  {
    border: 'var(--tt-color-highlight-brown-contrast)',
    label: 'Brown background',
    value: 'var(--tt-color-highlight-brown)',
  },
  {
    border: 'var(--tt-color-highlight-orange-contrast)',
    label: 'Orange background',
    value: 'var(--tt-color-highlight-orange)',
  },
  {
    border: 'var(--tt-color-highlight-yellow-contrast)',
    label: 'Yellow background',
    value: 'var(--tt-color-highlight-yellow)',
  },
  {
    border: 'var(--tt-color-highlight-green-contrast)',
    label: 'Green background',
    value: 'var(--tt-color-highlight-green)',
  },
  {
    border: 'var(--tt-color-highlight-blue-contrast)',
    label: 'Blue background',
    value: 'var(--tt-color-highlight-blue)',
  },
  {
    border: 'var(--tt-color-highlight-purple-contrast)',
    label: 'Purple background',
    value: 'var(--tt-color-highlight-purple)',
  },
  {
    border: 'var(--tt-color-highlight-pink-contrast)',
    label: 'Pink background',
    value: 'var(--tt-color-highlight-pink)',
  },
  {
    border: 'var(--tt-color-highlight-red-contrast)',
    label: 'Red background',
    value: 'var(--tt-color-highlight-red)',
  },
];

/**
 * Checks if highlight can be toggled in the current editor state
 */
export const canToggleHighlight = (editor: Editor | null): boolean => {
  if (!editor) return false;

  try {
    return editor.can().setMark('highlight');
  } catch {
    return false;
  }
};

/**
 * Checks if highlight is active in the current selection
 */
export const isHighlightActive = (editor: Editor | null, color: string): boolean =>
  !editor ? false : editor.isActive('highlight', { color });

/**
 * Toggles highlight on the current selection or specified node
 */
export const toggleHighlight = (
  editor: Editor | null,
  color: string,
  node?: Node | null,
  nodePos?: number | null
): void => {
  if (!editor) return;

  try {
    const chain = editor.chain().focus();

    if (isEmptyNode(node)) {
      chain.toggleMark('highlight', { color }).run();
    } else if (nodePos !== undefined && nodePos !== null && nodePos !== -1) {
      chain.setNodeSelection(nodePos).toggleMark('highlight', { color }).run();
    } else if (node) {
      const foundPos = findNodePosition({ editor, node: node as Node });
      if (foundPos) {
        chain.setNodeSelection(foundPos.pos).toggleMark('highlight', { color }).run();
      } else {
        chain.toggleMark('highlight', { color }).run();
      }
    } else {
      chain.toggleMark('highlight', { color }).run();
    }

    editor.chain().setMeta('hideDragHandle', true).run();
  } catch (error) {
    console.error('Failed to apply highlight:', error);
  }
};

/**
 * Determines if the highlight button should be disabled
 */
export const isColorHighlightButtonDisabled = (editor: Editor | null, userDisabled = false): boolean => {
  if (!editor || userDisabled) return true;

  const isIncompatibleContext =
    editor.isActive('code') || editor.isActive('codeBlock') || editor.isActive('imageUpload');

  return isIncompatibleContext || !canToggleHighlight(editor);
};

/**
 * Determines if the highlight button should be shown
 */
export const shouldShowColorHighlightButton = (
  editor: Editor | null,
  hideWhenUnavailable: boolean,
  highlightInSchema: boolean
): boolean => {
  if (!highlightInSchema || !editor) return false;

  if (hideWhenUnavailable) {
    if (isNodeSelection(editor.state.selection) || !canToggleHighlight(editor)) {
      return false;
    }
  }

  return true;
};

export const shouldShowColorHighlightPopover = (params: {
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
