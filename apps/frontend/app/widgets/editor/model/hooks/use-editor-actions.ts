import type { Content } from '@tiptap/core';
import { useAtom } from 'jotai';

import { editorAtom } from '../store/editor-store';

/**
 * Hook for editor actions that are React Compiler compatible
 * All editor method calls go through this hook to ensure proper synchronization
 */
export const useEditorActions = () => {
  const [editor] = useAtom(editorAtom);

  const toggleMark = (markName: string, attributes?: Record<string, unknown>) => {
    if (!editor) return false;
    return editor.chain().focus().toggleMark(markName, attributes).run();
  };

  const setMark = (markName: string, attributes?: Record<string, unknown>) => {
    if (!editor) return false;
    return editor.chain().focus().setMark(markName, attributes).run();
  };

  const unsetMark = (markName: string) => {
    if (!editor) return false;
    return editor.chain().focus().unsetMark(markName).run();
  };

  const toggleNode = (nodeName: string, attributes?: Record<string, unknown>) => {
    if (!editor) return false;
    return editor.chain().focus().toggleNode(nodeName, 'paragraph', attributes).run();
  };

  const setNode = (nodeName: string, attributes?: Record<string, unknown>) => {
    if (!editor) return false;
    return editor.chain().focus().setNode(nodeName, attributes).run();
  };

  // const lift = () => {
  //   if (!editor) return false;
  //   return editor.chain().focus().lift().run();
  // };

  // const wrap = (nodeName: string, attributes?: Record<string, any>) => {
  //   if (!editor) return false;
  //   return editor.chain().focus().wrap(nodeName, attributes).run();
  // };

  // const unwrap = (nodeName: string) => {
  //   if (!editor) return false;
  //   return editor.chain().focus().unwrap(nodeName).run();
  // };

  const insertContent = (content: Content) => {
    if (!editor) return false;
    return editor.chain().focus().insertContent(content).run();
  };

  // const deleteContent = (from?: number, to?: number) => {
  //   if (!editor) return false;
  //   return editor.chain().focus().deleteContent(from, to).run();
  // };

  const clearContent = () => {
    if (!editor) return false;
    return editor.chain().focus().clearContent().run();
  };

  const focus = (position?: number) => {
    if (!editor) return false;
    if (position !== undefined) {
      return editor.chain().focus(position).run();
    }
    return editor.chain().focus().run();
  };

  const blur = () => {
    if (!editor) return false;
    return editor.chain().blur().run();
  };

  const undo = () => {
    if (!editor) return false;
    return editor.chain().focus().undo().run();
  };

  const redo = () => {
    if (!editor) return false;
    return editor.chain().focus().redo().run();
  };

  const setLink = (href: string, target?: string) => {
    if (!editor) return false;
    return editor.chain().focus().extendMarkRange('link').setLink({ href, target }).run();
  };

  const unsetLink = () => {
    if (!editor) return false;
    return editor.chain().focus().extendMarkRange('link').unsetLink().run();
  };

  const setTextAlign = (align: 'left' | 'center' | 'right' | 'justify') => {
    if (!editor) return false;
    return editor.chain().focus().setTextAlign(align).run();
  };

  const setColor = (color: string) => {
    if (!editor) return false;
    return editor.chain().focus().setColor(color).run();
  };

  const setHighlight = (color: string) => {
    if (!editor) return false;
    return editor.chain().focus().toggleMark('highlight', { color }).run();
  };

  const unsetHighlight = () => {
    if (!editor) return false;
    return editor.chain().focus().unsetMark('highlight').run();
  };

  const setCodeBlock = (language?: string, fileName?: string) => {
    if (!editor) return false;
    const attrs: Record<string, unknown> = {};
    if (language) attrs.language = language;
    if (fileName) attrs.fileName = fileName;
    return editor.chain().focus().toggleNode('codeBlock', 'paragraph', attrs).run();
  };

  const setHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    if (!editor) return false;
    return editor.chain().focus().toggleHeading({ level }).run();
  };

  const setBlockquote = () => {
    if (!editor) return false;
    return editor.chain().focus().toggleBlockquote().run();
  };

  const setBulletList = () => {
    if (!editor) return false;
    return editor.chain().focus().toggleBulletList().run();
  };

  const setOrderedList = () => {
    if (!editor) return false;
    return editor.chain().focus().toggleOrderedList().run();
  };

  // const setListItem = () => {
  //   if (!editor) return false;
  //   return editor.chain().focus().toggleListItem().run();
  // };

  const setHorizontalRule = () => {
    if (!editor) return false;
    return editor.chain().focus().setHorizontalRule().run();
  };

  const setImage = (src: string, alt?: string, title?: string) => {
    if (!editor) return false;
    return editor.chain().focus().setImage({ alt, src, title }).run();
  };

  const setTable = (rows: number, cols: number) => {
    if (!editor) return false;
    return editor.chain().focus().insertTable({ cols, rows }).run();
  };

  const addColumnBefore = () => {
    if (!editor) return false;
    return editor.chain().focus().addColumnBefore().run();
  };

  const addColumnAfter = () => {
    if (!editor) return false;
    return editor.chain().focus().addColumnAfter().run();
  };

  const deleteColumn = () => {
    if (!editor) return false;
    return editor.chain().focus().deleteColumn().run();
  };

  const addRowBefore = () => {
    if (!editor) return false;
    return editor.chain().focus().addRowBefore().run();
  };

  const addRowAfter = () => {
    if (!editor) return false;
    return editor.chain().focus().addRowAfter().run();
  };

  const deleteRow = () => {
    if (!editor) return false;
    return editor.chain().focus().deleteRow().run();
  };

  const deleteTable = () => {
    if (!editor) return false;
    return editor.chain().focus().deleteTable().run();
  };

  const mergeCells = () => {
    if (!editor) return false;
    return editor.chain().focus().mergeCells().run();
  };

  const splitCell = () => {
    if (!editor) return false;
    return editor.chain().focus().splitCell().run();
  };

  const toggleHeaderColumn = () => {
    if (!editor) return false;
    return editor.chain().focus().toggleHeaderColumn().run();
  };

  const toggleHeaderRow = () => {
    if (!editor) return false;
    return editor.chain().focus().toggleHeaderRow().run();
  };

  const toggleHeaderCell = () => {
    if (!editor) return false;
    return editor.chain().focus().toggleHeaderCell().run();
  };

  return {
    addColumnAfter,
    addColumnBefore,
    addRowAfter,
    addRowBefore,
    blur,
    clearContent,
    deleteColumn,
    // deleteContent,
    deleteRow,
    deleteTable,

    // Focus actions
    focus,

    // Content actions
    insertContent,
    // lift,
    mergeCells,
    redo,
    setBlockquote,
    setBulletList,

    // Block actions
    setCodeBlock,
    setColor,
    setHeading,
    setHighlight,
    setHorizontalRule,

    // Media actions
    setImage,

    // Link actions
    setLink,
    // setListItem,
    setMark,
    setNode,
    setOrderedList,

    // Table actions
    setTable,

    // Formatting actions
    setTextAlign,
    splitCell,
    toggleHeaderCell,
    toggleHeaderColumn,
    toggleHeaderRow,
    // Mark actions
    toggleMark,

    // Node actions
    toggleNode,

    // History actions
    undo,
    unsetHighlight,
    unsetLink,
    unsetMark,
    // unwrap,
    // wrap,
  };
};
