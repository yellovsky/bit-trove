import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { CalloutTitleRenderer } from '../../ui/CalloutRenderer';

export interface CalloutTitleOptions {
  /**
   * Custom HTML attributes that should be added to the rendered HTML tag.
   */
  HTMLAttributes: {
    [key: string]: unknown;
  };
}

export const CalloutTitle = Node.create<CalloutTitleOptions>({
  addNodeView() {
    return ReactNodeViewRenderer(CalloutTitleRenderer);
  },

  addOptions() {
    return { HTMLAttributes: {} };
  },

  content: 'text*',
  defining: true,
  isolating: true,
  name: 'calloutTitle',

  parseHTML() {
    return [{ tag: 'div' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': 'calloutTitle' }), 0];
  },
});
