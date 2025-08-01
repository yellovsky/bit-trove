import type { Editor } from '@tiptap/react';
import { type RefObject, useCallback, useEffect, useState } from 'react';

import { useWindowSize } from '@repo/ui/hooks/use-window-size';

/**
 * Interface defining required parameters for the cursor visibility hook
 */
export interface CursorVisibilityOptions {
  /**
   * The TipTap editor instance
   */
  editor: Editor | null;

  /**
   * Reference to the toolbar element that may obscure the cursor
   */
  overlayHeight?: number;

  /**
   * Reference to the element to track for cursor visibility
   */
  elementRef?: RefObject<HTMLElement> | null;
}

/**
 * Simplified DOMRect type containing only the essential positioning properties
 */
export type RectState = Pick<DOMRect, 'x' | 'y' | 'width' | 'height'>;

/**
 * Custom hook that ensures the cursor remains visible when typing in a TipTap editor.
 * Automatically scrolls the window when the cursor would be hidden by the toolbar.
 *
 * This is particularly useful for long-form content editing where the cursor
 * might move out of the visible area as the user types.
 *
 * @param options Configuration options for cursor visibility behavior
 * @returns void
 */
export const useCursorVisibility = ({ editor, overlayHeight = 0, elementRef = null }: CursorVisibilityOptions) => {
  const { height: windowHeight } = useWindowSize();
  const [rect, setRect] = useState<RectState>({ height: 0, width: 0, x: 0, y: 0 });

  const updateRect = useCallback(() => {
    const element = elementRef?.current ?? document.body;

    const { x, y, width, height } = element.getBoundingClientRect();
    setRect({ height, width, x, y });
  }, [elementRef]);

  useEffect(() => {
    const element = elementRef?.current ?? document.body;

    updateRect();

    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(updateRect);
    });

    resizeObserver.observe(element);
    window.addEventListener('scroll', updateRect, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updateRect);
    };
  }, [elementRef, updateRect]);

  useEffect(() => {
    const ensureCursorVisibility = () => {
      if (!editor) return;

      const { state, view } = editor;

      if (!view.hasFocus()) return;

      // Get current cursor position coordinates
      const { from } = state.selection;
      const cursorCoords = view.coordsAtPos(from);

      if (windowHeight < rect.height) {
        if (cursorCoords) {
          // Check if there's enough space between cursor and bottom of window
          const availableSpace = windowHeight - cursorCoords.top - overlayHeight > 0;

          // If not enough space, scroll to position cursor in the middle of viewport
          if (!availableSpace) {
            const targetScrollY =
              // TODO: Needed?
              //   window.scrollY + (cursorCoords.top - windowHeight / 2)
              cursorCoords.top - windowHeight / 2;

            window.scrollTo({
              behavior: 'smooth',
              top: targetScrollY,
            });
          }
        }
      }
    };

    ensureCursorVisibility();
  }, [editor, overlayHeight, windowHeight, rect.height]);

  return rect;
};
