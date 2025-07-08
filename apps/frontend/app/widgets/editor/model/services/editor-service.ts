import { type JSONContent, type UseEditorOptions, useEditor as useTipTapEditor } from '@tiptap/react';

import { getExtensions } from '../../config';

export const escapeCodeTags = (html: string): string =>
  html.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/g, (match, codeContent) => {
    const escapedCode = codeContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return match.replace(codeContent, escapedCode);
  });

export const escapeContentCodeTags = (content: string | JSONContent): string | JSONContent =>
  typeof content === 'string' ? escapeCodeTags(content) : content;

export const useEditor = (options: UseEditorOptions) => {
  const content = options.content ? escapeContentCodeTags(options.content) : undefined;

  return useTipTapEditor({
    ...options,
    content,
    editorProps: {
      attributes: {
        'aria-label': 'Main content area, start typing to enter text.',
        autocapitalize: 'off',
        autocomplete: 'off',
        autocorrect: 'off',
      },
    },
    extensions: getExtensions(options.extensions),
  });
};
