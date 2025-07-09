import { NodeViewContent, type NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import type { FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * CalloutContentRenderer
 * -----------------------------------------------------------------------------------------------*/
const CALLOUT_CONTENT_RENDERER_NAME = 'CalloutContentRenderer';

interface CalloutContentRendererProps extends NodeViewProps {
  className?: string;
}

const CalloutContentRenderer: FC<CalloutContentRendererProps> = ({ className }) => (
  <NodeViewWrapper className={cn('callout-content', className)}>
    <NodeViewContent />
  </NodeViewWrapper>
);

CalloutContentRenderer.displayName = CALLOUT_CONTENT_RENDERER_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { CalloutContentRenderer };

export type { CalloutContentRendererProps };
