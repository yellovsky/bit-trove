import { EditorContent, type Editor as TipTapEditor } from '@tiptap/react';
import type { CSSProperties, FC } from 'react';

interface EditorProps {
  style?: CSSProperties;
  editor: TipTapEditor;
  className?: string;
}

export const Editor: FC<EditorProps> = (props) => (
  <div
  // className={cx(props.className, styles.content)}
  // data-mantine-color-scheme={'dark'}
  // style={{ colorScheme: 'dark' }}
  >
    <EditorContent editor={props.editor} />
  </div>
);
