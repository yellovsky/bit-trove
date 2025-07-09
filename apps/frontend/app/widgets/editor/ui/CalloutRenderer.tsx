import { NodeViewContent, type NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import type { FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * CalloutRenderer
 * -----------------------------------------------------------------------------------------------*/
const CALLOUT_RENDERER_NAME = 'CalloutRenderer';

interface CalloutRendererProps extends NodeViewProps {
  className?: string;
}

const CalloutRenderer: FC<CalloutRendererProps> = ({ className }) => (
  <NodeViewWrapper className={cn('callout', className)}>
    <NodeViewContent />
  </NodeViewWrapper>
);

CalloutRenderer.displayName = CALLOUT_RENDERER_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { CalloutRenderer };
export type { CalloutRendererProps };
