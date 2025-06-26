import type { Meta, StoryObj } from '@storybook/react';
import type { JSONContent } from '@tiptap/core';

import { PoseDocument } from './PoseDocument';

const content: JSONContent = {
  content: [
    {
      attrs: { level: 1 },
      content: [{ text: 'Building a Better Blog with Tiptap', type: 'text' }],
      type: 'heading',
    },
    {
      content: [
        { text: 'Tiptap is a powerful, headless text editor built on top of ', type: 'text' },
        {
          marks: [{ attrs: { href: 'https://prosemirror.net', target: '_blank' }, type: 'link' }],
          text: 'ProseMirror',
          type: 'text',
        },
        { text: '. It enables you to create custom editing experiences for your blog or CMS.', type: 'text' },
      ],
      type: 'paragraph',
    },
    {
      attrs: { level: 2 },
      content: [{ text: 'Features', type: 'text' }],
      type: 'heading',
    },
    {
      content: [
        {
          content: [{ content: [{ text: 'Support for rich text formatting', type: 'text' }], type: 'paragraph' }],
          type: 'listItem',
        },
        {
          content: [{ content: [{ text: 'Extensible with custom extensions', type: 'text' }], type: 'paragraph' }],
          type: 'listItem',
        },
        {
          content: [
            { content: [{ text: 'Works with React, Vue, or plain JavaScript', type: 'text' }], type: 'paragraph' },
          ],
          type: 'listItem',
        },
      ],
      type: 'bulletList',
    },
    {
      attrs: { level: 3 },
      content: [{ text: 'Getting Started', type: 'text' }],
      type: 'heading',
    },
    {
      content: [
        { text: 'Install it via npm: ', type: 'text' },
        {
          marks: [{ type: 'code' }],
          text: 'npm install @tiptap/react',
          type: 'text',
        },
        { text: ' and start building.', type: 'text' },
      ],
      type: 'paragraph',
    },
    {
      attrs: { language: 'tsx' },
      content: [
        {
          text: "import { EditorContent, useEditor } from '@tiptap/react';\nimport StarterKit from '@tiptap/starter-kit';",
          type: 'text',
        },
      ],
      type: 'codeBlock',
    },
    {
      attrs: { level: 4 },
      content: [{ text: 'Keyboard Shortcuts', type: 'text' }],
      type: 'heading',
    },
    {
      content: [
        { text: 'To save your draft, press ', type: 'text' },
        {
          marks: [{ type: 'kbd' }],
          text: 'Ctrl',
          type: 'text',
        },
        { text: ' + ', type: 'text' },
        {
          marks: [{ type: 'kbd' }],
          text: 'S',
          type: 'text',
        },
        { text: '.', type: 'text' },
      ],
      type: 'paragraph',
    },
    {
      content: [
        { text: 'You can also format text using ', type: 'text' },
        {
          marks: [{ type: 'bold' }],
          text: 'bold',
          type: 'text',
        },
        { text: ', ', type: 'text' },
        {
          marks: [{ type: 'italic' }],
          text: 'italic',
          type: 'text',
        },
        { text: ', ', type: 'text' },
        {
          marks: [{ type: 'underline' }],
          text: 'underline',
          type: 'text',
        },
        { text: ', or even use ', type: 'text' },
        {
          marks: [{ type: 'code' }],
          text: 'inline code',
          type: 'text',
        },
        { text: ' for technical terms.', type: 'text' },
      ],
      type: 'paragraph',
    },
    {
      content: [
        {
          content: [{ text: '“Good writing is clear thinking made visible.” – Bill Wheeler', type: 'text' }],
          type: 'paragraph',
        },
      ],
      type: 'blockquote',
    },
    {
      content: [{ text: 'To separate sections, you can use a horizontal rule:', type: 'text' }],
      type: 'paragraph',
    },
    {
      type: 'horizontalRule',
    },
    {
      attrs: { level: 2 },
      content: [{ text: 'Conclusion', type: 'text' }],
      type: 'heading',
    },
    {
      content: [
        {
          text: 'Tiptap makes it easy to create rich, structured content for your blog or CMS. With support for ',
          type: 'text',
        },
        {
          marks: [{ type: 'bold' }],
          text: 'custom extensions',
          type: 'text',
        },
        { text: " and a great developer experience, it's an ideal choice for modern content editing.", type: 'text' },
      ],
      type: 'paragraph',
    },
    {
      attrs: { order: 1 },
      content: [
        {
          content: [{ content: [{ text: 'Install dependencies', type: 'text' }], type: 'paragraph' }],
          type: 'listItem',
        },
        {
          content: [{ content: [{ text: 'Create your editor setup', type: 'text' }], type: 'paragraph' }],
          type: 'listItem',
        },
        {
          content: [{ content: [{ text: 'Render your content', type: 'text' }], type: 'paragraph' }],
          type: 'listItem',
        },
      ],
      type: 'orderedList',
    },
  ],
  type: 'doc',
};

const meta = {
  args: {
    doc: content,
  },
  component: PoseDocument,
  title: 'UI/PoseDocument',
} satisfies Meta<typeof PoseDocument>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
