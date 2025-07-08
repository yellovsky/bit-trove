import type { JSONContent } from '@tiptap/core';
import type { Editor } from '@tiptap/react';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Editor instance atom
export const editorAtom = atom<Editor | null>(null);

// Editor content state
export const editorContentAtom = atomWithStorage<JSONContent | null>('editor-content', null);

// Editor selection state
export const editorSelectionAtom = atom<{
  from: number;
  to: number;
  empty: boolean;
} | null>(null);

// Editor focus state
export const editorFocusAtom = atom<boolean>(false);

// Editor read-only state
export const editorReadOnlyAtom = atom<boolean>(false);

// Editor error state
export const editorErrorAtom = atom<string | null>(null);

// Editor loading state
export const editorLoadingAtom = atom<boolean>(false);

// Editor toolbar state
export const toolbarStateAtom = atom<{
  isVisible: boolean;
  position: 'top' | 'bottom' | 'floating';
  isFloating: boolean;
}>({
  isFloating: false,
  isVisible: true,
  position: 'top',
});

// Editor plugin states
export const pluginStatesAtom = atom<Record<string, any>>({});

// Editor history state
export const editorHistoryAtom = atom<{
  canUndo: boolean;
  canRedo: boolean;
  undoCount: number;
  redoCount: number;
}>({
  canRedo: false,
  canUndo: false,
  redoCount: 0,
  undoCount: 0,
});

// Editor marks state (for tracking active marks)
export const activeMarksAtom = atom<Record<string, boolean>>({});

// Editor nodes state (for tracking active nodes)
export const activeNodesAtom = atom<Record<string, boolean>>({});

// Computed atoms for derived state
export const isEditorActiveAtom = atom((get) => {
  const editor = get(editorAtom);
  return editor !== null && editor.isEditable;
});

export const hasSelectionAtom = atom((get) => {
  const selection = get(editorSelectionAtom);
  return selection !== null && !selection.empty;
});

export const canEditAtom = atom((get) => {
  const editor = get(editorAtom);
  const readOnly = get(editorReadOnlyAtom);
  return editor !== null && editor.isEditable && !readOnly;
});

export const editorStateSummaryAtom = atom((get) => {
  const editor = get(editorAtom);
  const content = get(editorContentAtom);
  const selection = get(editorSelectionAtom);
  const focus = get(editorFocusAtom);
  const readOnly = get(editorReadOnlyAtom);
  const error = get(editorErrorAtom);
  const loading = get(editorLoadingAtom);
  const history = get(editorHistoryAtom);
  const activeMarks = get(activeMarksAtom);
  const activeNodes = get(activeNodesAtom);

  return {
    activeMarks,
    activeNodes,
    canRedo: history.canRedo,
    canUndo: history.canUndo,
    hasContent: content !== null,
    hasEditor: editor !== null,
    hasError: error !== null,
    hasSelection: selection !== null && !selection.empty,
    isFocused: focus,
    isLoading: loading,
    isReadOnly: readOnly,
  };
});

// Action atoms for state updates
export const setEditorAtom = atom(null, (_get, set, editor: Editor | null) => {
  set(editorAtom, editor);

  // Reset related state when editor changes
  if (editor === null) {
    set(editorSelectionAtom, null);
    set(editorFocusAtom, false);
    set(editorErrorAtom, null);
    set(editorLoadingAtom, false);
    set(activeMarksAtom, {});
    set(activeNodesAtom, {});
    set(editorHistoryAtom, {
      canRedo: false,
      canUndo: false,
      redoCount: 0,
      undoCount: 0,
    });
  }
});

export const updateContentAtom = atom(null, (_get, set, content: JSONContent | null) => {
  set(editorContentAtom, content);
});

export const updateSelectionAtom = atom(
  null,
  (_get, set, selection: { from: number; to: number; empty: boolean } | null) => {
    set(editorSelectionAtom, selection);
  }
);

export const setFocusAtom = atom(null, (_get, set, focused: boolean) => {
  set(editorFocusAtom, focused);
});

export const setReadOnlyAtom = atom(null, (_get, set, readOnly: boolean) => {
  set(editorReadOnlyAtom, readOnly);
});

export const setErrorAtom = atom(null, (_get, set, error: string | null) => {
  set(editorErrorAtom, error);
});

export const setLoadingAtom = atom(null, (_get, set, loading: boolean) => {
  set(editorLoadingAtom, loading);
});

export const updateToolbarStateAtom = atom(
  null,
  (
    get,
    set,
    updates: Partial<{
      isVisible: boolean;
      position: 'top' | 'bottom' | 'floating';
      isFloating: boolean;
    }>
  ) => {
    const currentState = get(toolbarStateAtom);
    set(toolbarStateAtom, { ...currentState, ...updates });
  }
);

export const updatePluginStateAtom = atom(null, (get, set, pluginId: string, state: any) => {
  const currentStates = get(pluginStatesAtom);
  set(pluginStatesAtom, { ...currentStates, [pluginId]: state });
});

export const updateHistoryAtom = atom(
  null,
  (
    get,
    set,
    updates: Partial<{
      canUndo: boolean;
      canRedo: boolean;
      undoCount: number;
      redoCount: number;
    }>
  ) => {
    const currentHistory = get(editorHistoryAtom);
    set(editorHistoryAtom, { ...currentHistory, ...updates });
  }
);

export const updateActiveMarksAtom = atom(null, (get, set, markName: string, isActive: boolean) => {
  const currentMarks = get(activeMarksAtom);
  set(activeMarksAtom, { ...currentMarks, [markName]: isActive });
});

export const updateActiveNodesAtom = atom(null, (get, set, nodeName: string, isActive: boolean) => {
  const currentNodes = get(activeNodesAtom);
  set(activeNodesAtom, { ...currentNodes, [nodeName]: isActive });
});

// Reset all editor state
export const resetEditorStateAtom = atom(null, (_get, set) => {
  set(editorAtom, null);
  set(editorContentAtom, null);
  set(editorSelectionAtom, null);
  set(editorFocusAtom, false);
  set(editorReadOnlyAtom, false);
  set(editorErrorAtom, null);
  set(editorLoadingAtom, false);
  set(toolbarStateAtom, {
    isFloating: false,
    isVisible: true,
    position: 'top',
  });
  set(pluginStatesAtom, {});
  set(editorHistoryAtom, {
    canRedo: false,
    canUndo: false,
    redoCount: 0,
    undoCount: 0,
  });
  set(activeMarksAtom, {});
  set(activeNodesAtom, {});
});
