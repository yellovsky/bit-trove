import type { Editor } from '@tiptap/react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useSyncExternalStore } from 'react';

import {
  activeMarksAtom,
  activeNodesAtom,
  editorAtom,
  editorContentAtom,
  editorFocusAtom,
  editorHistoryAtom,
  editorSelectionAtom,
  setFocusAtom,
  updateActiveMarksAtom,
  updateActiveNodesAtom,
  updateContentAtom,
  updateHistoryAtom,
  updateSelectionAtom,
} from '../store/editor-store';

/**
 * Enhanced useEditorSync hook that works with React Compiler and Jotai store
 * This hook ensures all TipTap editor method calls are properly synchronized
 * and work correctly with React Compiler's optimization
 */
export const useEditorSync = <T>(editor: Editor | null, fn: (editor: Editor) => T, defaultValue: T): T => {
  const [editorState, setEditor] = useAtom(editorAtom);
  const updateContent = useSetAtom(updateContentAtom);
  const updateSelection = useSetAtom(updateSelectionAtom);
  const setFocus = useSetAtom(setFocusAtom);
  const updateHistory = useSetAtom(updateHistoryAtom);
  const updateActiveMarks = useSetAtom(updateActiveMarksAtom);
  const updateActiveNodes = useSetAtom(updateActiveNodesAtom);

  // Sync editor instance with store
  if (editor !== editorState) {
    setEditor(editor);
  }

  return useSyncExternalStore(
    (notify) => {
      if (!editor) return () => {};

      const handleUpdate = () => {
        // Update content
        const newContent = editor.getJSON();
        updateContent(newContent);

        // Update history state
        updateHistory({
          canRedo: editor.can().redo(),
          canUndo: editor.can().undo(),
        });

        // Update active marks
        const marks = ['bold', 'italic', 'underline', 'strike', 'code', 'highlight', 'link'];
        marks.forEach((mark) => {
          updateActiveMarks(mark, editor.isActive(mark));
        });

        // Update active nodes
        const nodes = ['heading', 'paragraph', 'codeBlock', 'blockquote', 'bulletList', 'orderedList'];
        nodes.forEach((node) => {
          updateActiveNodes(node, editor.isActive(node));
        });

        notify();
      };

      const handleSelectionUpdate = () => {
        const { from, to, empty } = editor.state.selection;
        updateSelection({ empty, from, to });
        notify();
      };

      const handleFocus = () => {
        setFocus(true);
        notify();
      };

      const handleBlur = () => {
        setFocus(false);
        notify();
      };

      // Subscribe to editor events
      editor.on('update', handleUpdate);
      editor.on('selectionUpdate', handleSelectionUpdate);
      editor.on('focus', handleFocus);
      editor.on('blur', handleBlur);

      return () => {
        editor.off('update', handleUpdate);
        editor.off('selectionUpdate', handleSelectionUpdate);
        editor.off('focus', handleFocus);
        editor.off('blur', handleBlur);
      };
    },
    () => (editor ? fn(editor) : defaultValue),
    () => defaultValue
  );
};

/**
 * Hook to get editor state from Jotai store
 */
export const useEditorState = () => {
  const editor = useAtomValue(editorAtom);
  const content = useAtomValue(editorContentAtom);
  const selection = useAtomValue(editorSelectionAtom);
  const focus = useAtomValue(editorFocusAtom);
  const history = useAtomValue(editorHistoryAtom);
  const activeMarks = useAtomValue(activeMarksAtom);
  const activeNodes = useAtomValue(activeNodesAtom);

  return {
    activeMarks,
    activeNodes,
    content,
    editor,
    focus,
    history,
    selection,
  };
};

/**
 * Hook to check if a specific mark is active
 * React Compiler compatible version
 */
export const useMarkActive = (markName: string): boolean => {
  const activeMarks = useAtomValue(activeMarksAtom);
  return activeMarks[markName] || false;
};

/**
 * Hook to check if a specific node is active
 * React Compiler compatible version
 */
export const useNodeActive = (nodeName: string): boolean => {
  const activeNodes = useAtomValue(activeNodesAtom);
  return activeNodes[nodeName] || false;
};

/**
 * Hook to check if editor can perform undo/redo
 * React Compiler compatible version
 */
export const useHistoryState = () => {
  const history = useAtomValue(editorHistoryAtom);
  return {
    canRedo: history.canRedo,
    canUndo: history.canUndo,
  };
};

/**
 * Hook to get editor content
 * React Compiler compatible version
 */
export const useEditorContent = () => {
  return useAtomValue(editorContentAtom);
};

/**
 * Hook to get editor selection
 * React Compiler compatible version
 */
export const useEditorSelection = () => {
  return useAtomValue(editorSelectionAtom);
};

/**
 * Hook to check if editor is focused
 * React Compiler compatible version
 */
export const useEditorFocus = (): boolean => {
  return useAtomValue(editorFocusAtom);
};
