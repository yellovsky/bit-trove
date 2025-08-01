import { type Editor, findChildren, findParentNode } from '@tiptap/core';
import { GapCursor } from '@tiptap/pm/gapcursor';
import type { ResolvedPos } from '@tiptap/pm/model';
import type { Selection } from '@tiptap/pm/state';

import { isNodeVisible } from './is-node-visible.js';

export const setGapCursor = (editor: Editor, direction: 'down' | 'right') => {
  const { state, view, extensionManager } = editor;
  const { schema, selection } = state;
  const { empty, $anchor } = selection;
  const hasGapCursorExtension = !!extensionManager.extensions.find((extension) => extension.name === 'gapCursor');

  if (!empty || $anchor.parent.type !== schema.nodes.calloutTitle || !hasGapCursorExtension) {
    return false;
  }

  if (direction === 'right' && $anchor.parentOffset !== $anchor.parent.nodeSize - 2) {
    return false;
  }

  const calloutTitle = findParentNode((node) => node.type === schema.nodes.calloutTitle)(selection);

  if (!calloutTitle) {
    return false;
  }

  const calloutContent = findChildren(calloutTitle.node, (node) => node.type === schema.nodes.calloutContent);

  if (!calloutContent.length) {
    return false;
  }

  const isOpen = isNodeVisible(calloutTitle.start + calloutContent[0].pos + 1, editor);

  if (isOpen) {
    return false;
  }

  const $position = state.doc.resolve(calloutTitle.pos + calloutTitle.node.nodeSize);
  const $validPosition = GapCursor.findFrom($position, 1, false) as unknown as null | ResolvedPos;

  if (!$validPosition) {
    return false;
  }

  const { tr } = state;
  const gapCursorSelection = new GapCursor($validPosition) as Selection;

  tr.setSelection(gapCursorSelection);
  tr.scrollIntoView();
  view.dispatch(tr);

  return true;
};
