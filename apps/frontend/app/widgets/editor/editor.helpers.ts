// import { Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { type Extensions, type JSONContent, type UseEditorOptions, useEditor as useTipTapEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { useMemo } from 'react';
import CodeBlockShiki from 'tiptap-extension-code-block-shiki';

import { Link } from './extensions/link';

const builtInExtensions = [
  StarterKit.configure({
    blockquote: { HTMLAttributes: { class: 'typography-blockquote' } },
    bulletList: { HTMLAttributes: { class: 'typography-list type-unordered' } },
    code: { HTMLAttributes: { class: 'typography-code' } },
    codeBlock: false,
    heading: { HTMLAttributes: { class: 'cmp-heading style-by-type' } },
    horizontalRule: { HTMLAttributes: { class: 'typography-horizontal-rule' } },
    listItem: { HTMLAttributes: { class: 'typography-list-item' } },
    orderedList: { HTMLAttributes: { class: 'typography-list type-ordered' } },
    paragraph: { HTMLAttributes: { class: 'typography-paragraph' } },
  }),
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
  Underline,
  Superscript,
  SubScript,

  TextAlign.configure({ types: ['heading', 'paragraph'] }),
] as const satisfies Extensions;

export const getExtensions = (extensions?: Extensions): Extensions => [...builtInExtensions, ...(extensions || [])];

export const escapeCodeTags = (html: string): string => {
  return html.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/g, (match, codeContent) => {
    const escapedCode = codeContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return match.replace(codeContent, escapedCode);
  });
};

export const escapeContentCodeTags = (content: string | JSONContent): string | JSONContent =>
  typeof content === 'string' ? escapeCodeTags(content) : content;

export const useEditor = (options: UseEditorOptions) => {
  const content = useMemo(
    () => (options.content ? escapeContentCodeTags(options.content) : undefined),
    [options.content]
  );

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
