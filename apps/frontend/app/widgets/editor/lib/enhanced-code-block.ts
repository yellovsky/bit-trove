import { type Command, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockShiki from 'tiptap-extension-code-block-shiki';

import { CodeBlockRenderer } from '../ui/CodeBlockRenderer';

export const EnhancedCodeBlock = CodeBlockShiki.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fileName: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-file-name'),
        renderHTML: (attributes) => {
          if (!attributes.fileName) {
            return {};
          }
          return {
            'data-file-name': attributes.fileName,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),

      clearCodeBlockFileName:
        (): Command =>
        ({ commands }) => {
          return commands.updateAttributes('codeBlock', { fileName: undefined });
        },

      getCodeBlockAttributes:
        (): Command =>
        ({ editor }) => {
          if (!editor.isActive('codeBlock')) {
            return false;
          }
          const attrs = editor.getAttributes('codeBlock');
          // Store the attributes in the editor storage for later retrieval
          editor.storage.enhancedCodeBlock = {
            fileName: attrs.fileName || '',
            language: attrs.language || '',
          };
          return true;
        },

      setCodeBlockAttributes:
        (attributes: { language?: string; fileName?: string }): Command =>
        ({ commands }) => {
          const validatedAttributes = { ...attributes };
          if (attributes.fileName !== undefined) {
            // Basic validation: ensure fileName is a non-empty string
            if (
              !attributes.fileName ||
              typeof attributes.fileName !== 'string' ||
              attributes.fileName.trim().length === 0
            ) {
              validatedAttributes.fileName = undefined;
            } else {
              // Sanitize the file name (remove potentially dangerous characters but allow forward slashes)
              const sanitized = attributes.fileName.trim().replace(/[<>:"\\|?*]/g, '');
              validatedAttributes.fileName = sanitized.length > 0 ? sanitized : undefined;
            }
          }
          return commands.updateAttributes('codeBlock', validatedAttributes);
        },

      setCodeBlockFileName:
        (fileName: string): Command =>
        ({ commands }) => {
          // Basic validation: ensure fileName is a non-empty string
          if (!fileName || typeof fileName !== 'string' || fileName.trim().length === 0) {
            return commands.updateAttributes('codeBlock', { fileName: undefined });
          }

          // Sanitize the file name (remove potentially dangerous characters but allow forward slashes)
          const sanitized = fileName.trim().replace(/[<>:"\\|?*]/g, '');
          const validatedFileName = sanitized.length > 0 ? sanitized : undefined;
          return commands.updateAttributes('codeBlock', { fileName: validatedFileName });
        },

      setCodeBlockLanguage:
        (language: string): Command =>
        ({ commands }) => {
          return commands.updateAttributes('codeBlock', { language });
        },
    };
  },

  addGlobalAttributes() {
    return [
      {
        attributes: {
          'data-enhanced': {
            default: 'true',
            parseHTML: () => 'true',
            renderHTML: () => ({ 'data-enhanced': 'true' }),
          },
        },
        types: ['codeBlock'],
      },
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockRenderer);
  },

  parseHTML() {
    return [{ preserveWhitespace: 'full', tag: 'pre' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['pre', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), ['code', {}, 0]];
  },
});
