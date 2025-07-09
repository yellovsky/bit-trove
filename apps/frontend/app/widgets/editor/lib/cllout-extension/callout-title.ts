import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { CalloutTitleRenderer } from '../../ui/CalloutTitleRenderer';

export interface CalloutTitleOptions {
  /**
   * Custom HTML attributes that should be added to the rendered HTML tag.
   */
  HTMLAttributes: {
    [key: string]: unknown;
  };
}

export const CalloutTitle = Node.create<CalloutTitleOptions>({
  addAttributes() {
    return {
      calloutType: {
        default: 'info',
        parseHTML: (element) => element.getAttribute('data-callout-type') || 'info',
        renderHTML: ({ calloutType }) => ({ 'data-callout-type': calloutType }),
      },
    };
  },

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
    return [{ tag: 'div[data-type="calloutTitle"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': 'calloutTitle' }), 0];
  },
});
