import type { Editor, Predicate } from '@tiptap/core';
import type { Node as ProseMirrorNode, ResolvedPos } from '@tiptap/pm/model';

import { isNodeVisible } from './is-node-visible.js';

export const findClosestVisibleNode = (
  $pos: ResolvedPos,
  predicate: Predicate,
  editor: Editor
):
  | {
      pos: number;
      start: number;
      depth: number;
      node: ProseMirrorNode;
    }
  | undefined => {
  for (let i = $pos.depth; i > 0; i -= 1) {
    const node = $pos.node(i);
    const match = predicate(node);
    const isVisible = isNodeVisible($pos.start(i), editor);

    if (match && isVisible) {
      return {
        depth: i,
        node,
        pos: i > 0 ? $pos.before(i) : 0,
        start: $pos.start(i),
      };
    }
  }
};
