import { NodeViewContent, type NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import type { FC } from 'react';

import { type CalloutType, getCalloutIconByType } from '@repo/ui/components/Callout';
import { IconButton } from '@repo/ui/components/IconButton';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/Popover';

const calloutTypes = [
  'info',
  'question',
  'warning',
  'danger',
  'code',
  'success',
  'recommendation',
] as const satisfies CalloutType[];

/* -------------------------------------------------------------------------------------------------
 * IconOption
 * -----------------------------------------------------------------------------------------------*/
const ICON_OPTION_NAME = 'IconOption';

interface IconOptionProps {
  type: CalloutType;
  updateAttributes: (attributes: Record<string, unknown>) => void;
}

const IconOption: FC<IconOptionProps> = ({ type, updateAttributes }) => {
  const Icon = getCalloutIconByType(type);

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
 * CalloutTitleRenderer
 * -----------------------------------------------------------------------------------------------*/
const CALLOUT_TITLE_RENDERER_NAME = 'CalloutTitleRenderer';

interface CalloutTitleRendererProps extends NodeViewProps {
  className?: string;
}

const CalloutTitleRenderer: FC<CalloutTitleRendererProps> = ({ className, ...rest }) => {
  const IconComponent = getCalloutIconByType(rest.node.attrs.calloutType);

  return (
    <NodeViewWrapper className="callout-header" data-callout-type={rest.node.attrs.calloutType}>
      <div className="callout-icon">
        <Popover>
          <PopoverTrigger asChild>{IconComponent && <IconComponent />}</PopoverTrigger>
          <PopoverContent className="flex flex-col p-0">
            {calloutTypes.map((type) => (
              <IconOption key={type} type={type} updateAttributes={rest.updateAttributes} />
            ))}
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex-1">
        <NodeViewContent className="callout-title" />
      </div>
    </NodeViewWrapper>
  );
};

CalloutTitleRenderer.displayName = CALLOUT_TITLE_RENDERER_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { CalloutTitleRenderer };

export type { CalloutTitleRendererProps };
