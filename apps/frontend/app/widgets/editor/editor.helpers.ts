import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { type Extensions, type JSONContent, type UseEditorOptions, useEditor as useTipTapEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import CodeBlockShiki from 'tiptap-extension-code-block-shiki';

import { Link } from './extensions/link';

const builtInExtensions = [
  StarterKit.configure({ codeBlock: false }),
  Underline,
  Superscript,
  SubScript,
  Highlight.configure({ multicolor: true }),
  CodeBlockShiki.configure({
    defaultTheme: 'nord',

    HTMLAttributes: {
      class: 'codeBlock',
      'data-mantine-color-scheme': 'dark',
      style: 'color-scheme: dark',
    },
  }),

  Link.configure({ HTMLAttributes: { class: 'typography-link' }, openOnClick: false }),
  // TODO implement this in editor and view
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
] as const satisfies Extensions;

const getExtensions = (extensions?: Extensions): Extensions => [...builtInExtensions, ...(extensions || [])];

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
