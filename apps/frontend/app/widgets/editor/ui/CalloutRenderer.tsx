import { NodeViewContent, type NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import type { FC } from 'react';

import * as Callout from '@repo/ui/components/Callout';
import { IconButton } from '@repo/ui/components/IconButton';
import * as Popover from '@repo/ui/components/Popover';

const calloutTypes = [
  'info',
  'question',
  'warning',
  'danger',
  'code',
  'success',
  'recommendation',
] as const satisfies Callout.CalloutType[];

/* -------------------------------------------------------------------------------------------------
 * IconOption
 * -----------------------------------------------------------------------------------------------*/
const ICON_OPTION_NAME = 'IconOption';

interface IconOptionProps {
  type: Callout.CalloutType;
  updateAttributes: (attributes: Record<string, unknown>) => void;
}

const IconOption: FC<IconOptionProps> = ({ type, updateAttributes }) => {
  const Icon = Callout.getCalloutIconByType(type);

  return (
    <IconButton
      aria-label={`Set ${type} callout`}
      onClick={() => updateAttributes({ calloutType: type })}
      type="button"
      variant="soft"
    >
      <Icon />
    </IconButton>
  );
};

IconOption.displayName = ICON_OPTION_NAME;

/* -------------------------------------------------------------------------------------------------
 * CalloutRenderer
 * -----------------------------------------------------------------------------------------------*/
const CALLOUT_RENDERER_NAME = 'CalloutRenderer';

interface CalloutRendererProps extends NodeViewProps {
  className?: string;
}

const CalloutRenderer: FC<CalloutRendererProps> = ({ className, ...rest }) => {
  const IconComponent = Callout.getCalloutIconByType(rest.node.attrs.calloutType);

  const icon = (
    <Popover.Root>
      <Popover.Trigger asChild>{IconComponent && <IconComponent />}</Popover.Trigger>
      <Popover.Content className="flex flex-col p-0">
        {calloutTypes.map((type) => (
          <IconOption key={type} type={type} updateAttributes={rest.updateAttributes} />
        ))}
      </Popover.Content>
    </Popover.Root>
  );

  return (
    <NodeViewWrapper className={className}>
      <Callout.Root data-callout-type={rest.node.attrs.calloutType} icon={icon}>
        <NodeViewContent />
      </Callout.Root>
    </NodeViewWrapper>
  );
};

CalloutRenderer.displayName = CALLOUT_RENDERER_NAME;

/* -------------------------------------------------------------------------------------------------
 * CalloutTitleRenderer
 * -----------------------------------------------------------------------------------------------*/
const CALLOUT_TITLE_RENDERER_NAME = 'CalloutTitleRenderer';

interface CalloutTitleRendererProps extends NodeViewProps {
  className?: string;
}

const CalloutTitleRenderer: FC<CalloutTitleRendererProps> = ({ className }) => (
  <NodeViewWrapper className={className}>
    <Callout.Title>
      <NodeViewContent />
    </Callout.Title>
  </NodeViewWrapper>
);

CalloutTitleRenderer.displayName = CALLOUT_TITLE_RENDERER_NAME;

/* -------------------------------------------------------------------------------------------------
 * CalloutContentRenderer
 * -----------------------------------------------------------------------------------------------*/
const CALLOUT_CONTENT_RENDERER_NAME = 'CalloutContentRenderer';

interface CalloutContentRendererProps extends NodeViewProps {
  className?: string;
}

const CalloutContentRenderer: FC<CalloutContentRendererProps> = ({ className }) => (
  <NodeViewWrapper className={className}>
    <Callout.Content>
      <NodeViewContent />
    </Callout.Content>
  </NodeViewWrapper>
);

CalloutContentRenderer.displayName = CALLOUT_CONTENT_RENDERER_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = CalloutRenderer;
const Title = CalloutTitleRenderer;
const Content = CalloutContentRenderer;

export {
  Root,
  Title,
  Content,
  //
  CalloutRenderer,
  CalloutTitleRenderer,
  CalloutContentRenderer,
};

export type { CalloutRendererProps, CalloutTitleRendererProps, CalloutContentRendererProps };
