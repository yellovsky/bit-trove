import type { Node } from '@tiptap/pm/model';
import { type Editor, isNodeSelection } from '@tiptap/react';

import { useTiptapEditor } from '../hooks/use-tiptap-editor';
import { findNodePosition, isEmptyNode, isMarkInSchema } from '../lib/tiptap-utils';
import './ColorHighlightButton.css';

import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

import { useEditorSync } from '../hooks/use-editor-sync';
import ToolbarButton from './ToolbarButton';

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

export interface ColorHighlightButtonProps extends Omit<ComponentProps<typeof ToolbarButton>, 'type'> {
  /**
   * The TipTap editor instance.
   */
  editor?: Editor | null;

  /**
   * The node to apply highlight to
   */
  node?: Node | null;

  /**
   * The position of the node in the document
   */
  nodePos?: number | null;

  /**
   * The color to apply when toggling the highlight.
   * If not provided, it will use the default color from the extension.
   */
  color: string;

  /**
   * Optional text to display alongside the icon.
   */
  text?: string;

  /**
   * Whether the button should hide when the mark is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean;

  /**
   * Called when the highlight is applied.
   */
  onApplied?: (color: string) => void;
}

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
      const foundPos = findNodePosition({ editor, node });
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

/**
 * Custom hook to manage highlight button state
 */
export const useHighlightState = (
  editor: Editor | null,
  color: string,
  disabled = false,
  hideWhenUnavailable = false
) => {
  const highlightInSchema = useEditorSync(editor, (e) => isMarkInSchema('highlight', e), false);
  const isDisabled = useEditorSync(editor, (e) => isColorHighlightButtonDisabled(e, disabled), false);
  const isActive = useEditorSync(editor, (e) => isHighlightActive(e, color), false);
  const shouldShow = useEditorSync(
    editor,
    (e) => shouldShowColorHighlightButton(e, hideWhenUnavailable, highlightInSchema),
    false
  );
  return { highlightInSchema, isActive, isDisabled, shouldShow };
};

/**
 * ColorHighlightButton component for TipTap editor
 */
export const ColorHighlightButton: FC<ColorHighlightButtonProps> = ({
  editor: providedEditor,
  node,
  nodePos,
  color,
  text,
  hideWhenUnavailable = false,
  disabled,
  onClick,
  onApplied,
  children,
  style,
  ...buttonProps
}) => {
  const editor = useTiptapEditor(providedEditor);
  const { isDisabled, isActive, shouldShow } = useHighlightState(editor, color, disabled, hideWhenUnavailable);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    if (!e.defaultPrevented && !isDisabled && editor) {
      toggleHighlight(editor, color, node, nodePos);
      onApplied?.(color);
    }
  };

  const buttonStyle = { ...style, '--highlight-color': color } as React.CSSProperties;

  if (!shouldShow || !editor || !editor.isEditable) return null;

  return (
    <ToolbarButton
      aria-label={`${color} highlight color`}
      disabled={isDisabled}
      isActive={isActive}
      onClick={handleClick}
      style={buttonStyle}
      tabIndex={-1}
      {...buttonProps}
    >
      {children || (
        <>
          <span
            className={cn('tiptap-button-highlight', 'rounded-full')}
            style={{ '--highlight-color': color } as React.CSSProperties}
          />
          {text && <span className="tiptap-button-text">{text}</span>}
        </>
      )}
    </ToolbarButton>
  );
};

ColorHighlightButton.displayName = 'ColorHighlightButton';

export default ColorHighlightButton;
