import { NodeViewContent, type NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { InfoIcon } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '@repo/ui/components/Button';
import { type CalloutType, calloutIcons } from '@repo/ui/components/Callout';
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

const getIconComponent = (type: CalloutType) => {
  return type in calloutIcons ? calloutIcons[type as keyof typeof calloutIcons] : InfoIcon;
};

/* -------------------------------------------------------------------------------------------------
 * IconOption
 * -----------------------------------------------------------------------------------------------*/
const ICON_OPTION_NAME = 'IconOption';

interface IconOptionProps {
  type: CalloutType;
  updateAttributes: (attributes: Record<string, unknown>) => void;
}

const IconOption: FC<IconOptionProps> = ({ type, updateAttributes }) => {
  const Icon = getIconComponent(type);

  return (
    <Button
      aria-label={`Set ${type} callout`}
      onClick={() => updateAttributes({ calloutType: type })}
      size="icon"
      type="button"
      variant="dimmed"
    >
      <Icon />
    </Button>
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
  const IconComponent = getIconComponent(rest.node.attrs.calloutType);

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
