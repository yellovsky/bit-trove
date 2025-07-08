import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import type { Extensions } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

import { EnhancedCodeBlock } from '../lib/enhanced-code-block';
import { Link } from '../lib/link-extension';

// Built-in extensions configuration
export const builtInExtensions = [
  StarterKit.configure({ codeBlock: false }),
  Underline,
  Superscript,
  SubScript,
  TextStyle,
  Color,
  Highlight.configure({ multicolor: true }),
  EnhancedCodeBlock.configure({
    defaultTheme: 'github-dark',
    HTMLAttributes: { class: 'codeBlock', style: 'color-scheme: dark' },
  }),
  Link.configure({ HTMLAttributes: { class: 'typography-link' }, openOnClick: false }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Table.configure({ resizable: true }),
  Image.configure({ allowBase64: true }),
] as const satisfies Extensions;

export const getExtensions = (extensions?: Extensions): Extensions => [...builtInExtensions, ...(extensions || [])];
