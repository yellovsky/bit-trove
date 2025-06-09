import { Editor, useEditor } from '@widgets/editor';

import type { Route } from './+types';

export default function EditorRoure(_props: Route.ComponentProps) {
  const editor = useEditor({});
  return !editor ? null : <Editor editor={editor} />;
}
