import { mergeAttributes, Node, ReactNodeViewRenderer } from '@tiptap/react';

import { CalloutContentRenderer } from '../../ui/CalloutContentRenderer';

export interface CalloutContentOptions {
  /**
   * Custom HTML attributes that should be added to the rendered HTML tag.
   */
  HTMLAttributes: {
    [key: string]: unknown;
  };
}

export const CalloutContent = Node.create<CalloutContentOptions>({
  addNodeView() {
    return ReactNodeViewRenderer(CalloutContentRenderer);
  },

  addOptions() {
    return { HTMLAttributes: {} };
  },

  content: 'block+',
  defining: true,
  name: 'calloutContent',

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': this.name }), 0];
  },
});
