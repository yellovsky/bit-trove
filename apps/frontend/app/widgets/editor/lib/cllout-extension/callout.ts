import { findChildren, findParentNode, mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { CalloutRenderer } from '../../ui/CalloutRenderer';

export interface CalloutOptions {
  /**
   * Specify if the open status should be saved in the document. Defaults to `false`.
   */
  persist: boolean;
  /**
   * Specifies a CSS class that is set when toggling the content. Defaults to `is-open`.
   */
  openClassName: string;
  /**
   * Custom HTML attributes that should be added to the rendered HTML tag.
   */
  HTMLAttributes: {
    [key: string]: unknown;
  };
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      /**
       * Set a callout node
       */
      setCallout: () => ReturnType;
      /**
       * Unset a callout node
       */
      unsetCallout: () => ReturnType;
      /**
       * Set the callout type
       */
      setCalloutType: (type: string) => ReturnType;
    };
  }
}

export const Callout = Node.create<CalloutOptions>({
  addAttributes() {
    return {
      calloutType: {
        default: 'info',
        parseHTML: (element) => element.getAttribute('data-callout-type') || 'info',
        renderHTML: ({ calloutType }) => ({ 'data-callout-type': calloutType }),
      },
    };
  },

  addCommands() {
    return {
      setCallout:
        () =>
        ({ state, chain }) => {
          const { schema, selection } = state;
          const { $from, $to } = selection;
          const range = $from.blockRange($to);

          if (!range) return false;

          const slice = state.doc.slice(range.start, range.end);
          const match = schema.nodes.calloutContent.contentMatch.matchFragment(slice.content);

          if (!match) return false;

          const content = slice.toJSON()?.content || [];

          return chain()
            .insertContentAt(
              { from: range.start, to: range.end },
              {
                attrs: { calloutType: 'info' },
                content: [
                  { content: [{ text: 'Title', type: 'text' }], type: 'calloutTitle' },
                  { content, type: 'calloutContent' },
                ],
                type: this.name,
              }
            )
            .setTextSelection(range.start + 2)
            .run();
        },

      setCalloutType:
        (type: string) =>
        ({ state, chain }) => {
          const { selection } = state;
          const callout = findParentNode((node) => node.type === this.type)(selection);

          if (!callout) return false;

          return chain()
            .command(({ tr }) => {
              tr.setNodeMarkup(callout.pos, undefined, { ...callout.node.attrs, calloutType: type });
              return true;
            })
            .run();
        },

      unsetCallout:
        () =>
        ({ state, chain }) => {
          const { selection, schema } = state;
          const callout = findParentNode((node) => node.type === this.type)(selection);

          if (!callout) return false;

          const calloutSummaries = findChildren(callout.node, (node) => node.type === schema.nodes.calloutTitle);
          const calloutContents = findChildren(callout.node, (node) => node.type === schema.nodes.calloutContent);

          if (!calloutSummaries.length || !calloutContents.length) return false;

          const calloutTitle = calloutSummaries[0];
          const calloutContent = calloutContents[0];
          const from = callout.pos;
          const $from = state.doc.resolve(from);
          const to = from + callout.node.nodeSize;
          const range = { from, to };
          const content = (calloutContent.node.content.toJSON() as []) || [];
          const defaultTypeForSummary = $from.parent.type.contentMatch.defaultType;

          // TODO: this may break for some custom schemas
          const summaryContent = defaultTypeForSummary?.create(null, calloutTitle.node.content).toJSON();
          const mergedContent = [summaryContent, ...content];

          return chain()
            .insertContentAt(range, mergedContent)
            .setTextSelection(from + 1)
            .run();
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => {
        const { schema, selection } = this.editor.state;
        const { empty, $anchor } = selection;

        if (!empty || $anchor.parent.type !== schema.nodes.calloutTitle) return false;

        if ($anchor.parentOffset !== 0) {
          return this.editor.commands.command(({ tr }) => {
            const from = $anchor.pos - 1;
            const to = $anchor.pos;

            tr.delete(from, to);

            return true;
          });
        }

        return this.editor.commands.unsetCallout();
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutRenderer);
  },

  addOptions() {
    return {
      HTMLAttributes: {},
      openClassName: 'is-open',
      persist: false,
    };
  },

  addProseMirrorPlugins() {
    return [];
  },

  allowGapCursor: false,
  content: 'calloutTitle calloutContent',
  defining: true,
  group: 'block',
  isolating: true,
  name: 'callout',

  parseHTML() {
    return [{ tag: 'div[data-type="callout"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-callout-type': HTMLAttributes.calloutType || 'info',
        'data-type': 'callout',
      }),
      0,
    ];
  },
});
