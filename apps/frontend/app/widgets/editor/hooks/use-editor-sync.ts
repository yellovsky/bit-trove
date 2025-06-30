import type { Editor } from '@tiptap/react';
import { useSyncExternalStore } from 'react';

const SYNC_EVENTS = ['update', 'selectionUpdate', 'transaction'] as const;

export const useEditorSync = <T>(editor: Editor | null, fn: (editor: Editor) => T, defaultValue: T): T =>
  useSyncExternalStore(
    (notify) => {
      for (const event of SYNC_EVENTS) editor?.on(event, notify);

      return () => {
        for (const event of SYNC_EVENTS) editor?.off(event, notify);
      };
    },
    () => (editor ? fn(editor) : defaultValue),
    () => defaultValue
  );
