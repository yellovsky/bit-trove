import type { Node } from '@tiptap/pm/model';
import type { Editor, JSONContent } from '@tiptap/react';

/**
 * Checks if a node type exists in the editor's schema
 */
export const isNodeInSchema = (nodeType: string, editor: Editor | null): boolean => {
  if (!editor) return false;
  return Object.hasOwn(editor.schema.nodes, nodeType);
};

/**
 * Checks if a mark type exists in the editor's schema
 */
export const isMarkInSchema = (markType: string, editor: Editor | null): boolean => {
  if (!editor) return false;
  return Object.hasOwn(editor.schema.marks, markType);
};

/**
 * Finds the position of a node in the document
 */
export const findNodePosition = ({
  editor,
  node,
}: {
  editor: Editor | null;
  node: Node | null;
}): { pos: number } | null => {
  if (!editor || !node) return null;

  let foundPos: number | null = null;

  editor.state.doc.descendants((docNode, pos) => {
    if (docNode === node && foundPos === null) {
      foundPos = pos;
      return false;
    }
  });

  return foundPos !== null ? { pos: foundPos } : null;
};

/**
 * Checks if a node is empty
 */
export const isEmptyNode = (node: Node | null | undefined): boolean => {
  if (!node) return true;
  return node.content.size === 0;
};

/**
 * Sanitizes a URL for safe use
 */
export const sanitizeUrl = (url: string): string => {
  if (!url) return '';

  // Remove any potentially dangerous characters
  const sanitized = url.trim().replace(/[<>]/g, '');

  // Ensure it starts with a valid protocol
  if (!/^https?:\/\//i.test(sanitized)) {
    return `https://${sanitized}`;
  }

  return sanitized;
};

/**
 * Escapes content code tags to prevent XSS
 */
export const escapeContentCodeTags = (
  content: string | JSONContent | JSONContent[]
): string | JSONContent | JSONContent[] => {
  if (typeof content === 'string') {
    return content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  if (Array.isArray(content)) {
    return content.map(escapeContentCodeTags);
  }

  if (content && typeof content === 'object') {
    const escaped: Record<string, string | JSONContent | JSONContent[]> = {};
    for (const [key, value] of Object.entries(content)) {
      escaped[key] = escapeContentCodeTags(value);
    }
    return escaped;
  }

  return content;
};
