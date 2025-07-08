import type { Meta, StoryObj } from '@storybook/react';

import { useTiptapEditor } from '../model/hooks/use-tiptap-editor';
import { Editor } from './Editor';

const render = () => {
  const editor = useTiptapEditor();
  return !editor ? <div /> : <Editor editor={editor} />;
};

const meta = {
  render,
  title: 'Editor',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
