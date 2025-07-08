import { createStore } from 'jotai';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  activeMarksAtom,
  activeNodesAtom,
  canEditAtom,
  editorAtom,
  editorContentAtom,
  editorErrorAtom,
  editorFocusAtom,
  editorHistoryAtom,
  editorLoadingAtom,
  editorReadOnlyAtom,
  editorSelectionAtom,
  editorStateSummaryAtom,
  hasSelectionAtom,
  isEditorActiveAtom,
  pluginStatesAtom,
  resetEditorStateAtom,
  setEditorAtom,
  setErrorAtom,
  setFocusAtom,
  setLoadingAtom,
  setReadOnlyAtom,
  toolbarStateAtom,
  updateActiveMarksAtom,
  updateActiveNodesAtom,
  updateContentAtom,
  updateHistoryAtom,
  updatePluginStateAtom,
  updateSelectionAtom,
  updateToolbarStateAtom,
} from './editor-store';

describe('Editor Store', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  describe('Basic Atoms', () => {
    it('should initialize with default values', () => {
      expect(store.get(editorAtom)).toBe(null);
      expect(store.get(editorContentAtom)).toBe(null);
      expect(store.get(editorSelectionAtom)).toBe(null);
      expect(store.get(editorFocusAtom)).toBe(false);
      expect(store.get(editorReadOnlyAtom)).toBe(false);
      expect(store.get(editorErrorAtom)).toBe(null);
      expect(store.get(editorLoadingAtom)).toBe(false);
    });

    it('should update editor atom', () => {
      const mockEditor = { isEditable: true } as any;
      store.set(setEditorAtom, mockEditor);
      expect(store.get(editorAtom)).toBe(mockEditor);
    });

    it('should update content atom', () => {
      const mockContent = { content: [], type: 'doc' };
      store.set(updateContentAtom, mockContent);
      expect(store.get(editorContentAtom)).toBe(mockContent);
    });

    it('should update selection atom', () => {
      const mockSelection = { empty: false, from: 0, to: 5 };
      store.set(updateSelectionAtom, mockSelection);
      expect(store.get(editorSelectionAtom)).toEqual(mockSelection);
    });

    it('should update focus atom', () => {
      store.set(setFocusAtom, true);
      expect(store.get(editorFocusAtom)).toBe(true);
    });

    it('should update read-only atom', () => {
      store.set(setReadOnlyAtom, true);
      expect(store.get(editorReadOnlyAtom)).toBe(true);
    });

    it('should update error atom', () => {
      const errorMessage = 'Test error';
      store.set(setErrorAtom, errorMessage);
      expect(store.get(editorErrorAtom)).toBe(errorMessage);
    });

    it('should update loading atom', () => {
      store.set(setLoadingAtom, true);
      expect(store.get(editorLoadingAtom)).toBe(true);
    });
  });

  describe('Toolbar State', () => {
    it('should initialize with default toolbar state', () => {
      const toolbarState = store.get(toolbarStateAtom);
      expect(toolbarState).toEqual({
        isFloating: false,
        isVisible: true,
        position: 'top',
      });
    });

    it('should update toolbar state', () => {
      store.set(updateToolbarStateAtom, { isFloating: true, position: 'bottom' });
      const toolbarState = store.get(toolbarStateAtom);
      expect(toolbarState).toEqual({
        isFloating: true,
        isVisible: true,
        position: 'bottom',
      });
    });
  });

  describe('Plugin States', () => {
    it('should initialize with empty plugin states', () => {
      expect(store.get(pluginStatesAtom)).toEqual({});
    });

    it('should update plugin state', () => {
      const pluginState = { config: { theme: 'dark' }, enabled: true };
      store.set(updatePluginStateAtom, 'testPlugin', pluginState);
      const pluginStates = store.get(pluginStatesAtom);
      expect(pluginStates.testPlugin).toEqual(pluginState);
    });
  });

  describe('History State', () => {
    it('should initialize with default history state', () => {
      const historyState = store.get(editorHistoryAtom);
      expect(historyState).toEqual({
        canRedo: false,
        canUndo: false,
        redoCount: 0,
        undoCount: 0,
      });
    });

    it('should update history state', () => {
      store.set(updateHistoryAtom, { canUndo: true, undoCount: 5 });
      const historyState = store.get(editorHistoryAtom);
      expect(historyState).toEqual({
        canRedo: false,
        canUndo: true,
        redoCount: 0,
        undoCount: 5,
      });
    });
  });

  describe('Active Marks and Nodes', () => {
    it('should initialize with empty active marks and nodes', () => {
      expect(store.get(activeMarksAtom)).toEqual({});
      expect(store.get(activeNodesAtom)).toEqual({});
    });

    it('should update active marks', () => {
      store.set(updateActiveMarksAtom, 'bold', true);
      store.set(updateActiveMarksAtom, 'italic', false);
      const activeMarks = store.get(activeMarksAtom);
      expect(activeMarks).toEqual({
        bold: true,
        italic: false,
      });
    });

    it('should update active nodes', () => {
      store.set(updateActiveNodesAtom, 'heading', true);
      store.set(updateActiveNodesAtom, 'paragraph', false);
      const activeNodes = store.get(activeNodesAtom);
      expect(activeNodes).toEqual({
        heading: true,
        paragraph: false,
      });
    });
  });

  describe('Computed Atoms', () => {
    it('should compute isEditorActive correctly', () => {
      // Initially no editor
      expect(store.get(isEditorActiveAtom)).toBe(false);

      // Set editor with isEditable: true
      const mockEditor = { isEditable: true } as any;
      store.set(setEditorAtom, mockEditor);
      expect(store.get(isEditorActiveAtom)).toBe(true);

      // Set editor with isEditable: false
      const mockEditorDisabled = { isEditable: false } as any;
      store.set(setEditorAtom, mockEditorDisabled);
      expect(store.get(isEditorActiveAtom)).toBe(false);
    });

    it('should compute hasSelection correctly', () => {
      // Initially no selection
      expect(store.get(hasSelectionAtom)).toBe(false);

      // Set empty selection
      store.set(updateSelectionAtom, { empty: true, from: 0, to: 0 });
      expect(store.get(hasSelectionAtom)).toBe(false);

      // Set non-empty selection
      store.set(updateSelectionAtom, { empty: false, from: 0, to: 5 });
      expect(store.get(hasSelectionAtom)).toBe(true);
    });

    it('should compute canEdit correctly', () => {
      // Initially no editor and not read-only
      expect(store.get(canEditAtom)).toBe(false);

      // Set editor with isEditable: true and not read-only
      const mockEditor = { isEditable: true } as any;
      store.set(setEditorAtom, mockEditor);
      expect(store.get(canEditAtom)).toBe(true);

      // Set read-only
      store.set(setReadOnlyAtom, true);
      expect(store.get(canEditAtom)).toBe(false);

      // Set editor with isEditable: false
      const mockEditorDisabled = { isEditable: false } as any;
      store.set(setEditorAtom, mockEditorDisabled);
      store.set(setReadOnlyAtom, false);
      expect(store.get(canEditAtom)).toBe(false);
    });

    it('should compute editorStateSummary correctly', () => {
      const summary = store.get(editorStateSummaryAtom);
      expect(summary).toEqual({
        activeMarks: {},
        activeNodes: {},
        canRedo: false,
        canUndo: false,
        hasContent: false,
        hasEditor: false,
        hasError: false,
        hasSelection: false,
        isFocused: false,
        isLoading: false,
        isReadOnly: false,
      });
    });
  });

  describe('Reset Functionality', () => {
    it('should reset all editor state', () => {
      // Set some state
      const mockEditor = { isEditable: true } as any;
      const mockContent = { content: [], type: 'doc' };
      const mockSelection = { empty: false, from: 0, to: 5 };

      store.set(setEditorAtom, mockEditor);
      store.set(updateContentAtom, mockContent);
      store.set(updateSelectionAtom, mockSelection);
      store.set(setFocusAtom, true);
      store.set(setReadOnlyAtom, true);
      store.set(setErrorAtom, 'Test error');
      store.set(setLoadingAtom, true);
      store.set(updateToolbarStateAtom, { position: 'bottom' });
      store.set(updatePluginStateAtom, 'testPlugin', { enabled: true });
      store.set(updateHistoryAtom, { canUndo: true, undoCount: 5 });
      store.set(updateActiveMarksAtom, 'bold', true);
      store.set(updateActiveNodesAtom, 'heading', true);

      // Reset all state
      store.set(resetEditorStateAtom);

      // Verify all state is reset
      expect(store.get(editorAtom)).toBe(null);
      expect(store.get(editorContentAtom)).toBe(null);
      expect(store.get(editorSelectionAtom)).toBe(null);
      expect(store.get(editorFocusAtom)).toBe(false);
      expect(store.get(editorReadOnlyAtom)).toBe(false);
      expect(store.get(editorErrorAtom)).toBe(null);
      expect(store.get(editorLoadingAtom)).toBe(false);
      expect(store.get(toolbarStateAtom)).toEqual({
        isFloating: false,
        isVisible: true,
        position: 'top',
      });
      expect(store.get(pluginStatesAtom)).toEqual({});
      expect(store.get(editorHistoryAtom)).toEqual({
        canRedo: false,
        canUndo: false,
        redoCount: 0,
        undoCount: 0,
      });
      expect(store.get(activeMarksAtom)).toEqual({});
      expect(store.get(activeNodesAtom)).toEqual({});
    });
  });
});
