import type { FC } from 'react';

import { IconToggle } from '@repo/ui/components/IconToggle';
import { Toggle, type ToggleProps } from '@repo/ui/components/Toggle';
import { Tooltip, TooltipContent, type TooltipContentProps, TooltipTrigger } from '@repo/ui/components/Tooltip';

/* -------------------------------------------------------------------------------------------------
 * ToolbarButton
 * -----------------------------------------------------------------------------------------------*/
const TOOLBAR_BUTTON_NAME = 'ToolbarButton';

type ToolbarButtonProps = ToggleProps & {
  icon?: true;
  isActive?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipContentProps;
};

const ToolbarButton: FC<ToolbarButtonProps> = ({ icon, children, tooltip, className, tooltipOptions, ...props }) => {
  const toggleButton = icon ? (
    <IconToggle size="md" {...props}>
      {children}
    </IconToggle>
  ) : (
    <Toggle size="md" {...props}>
      {children}
    </Toggle>
  );

  return !tooltip ? (
    toggleButton
  ) : (
    <Tooltip delayDuration={700}>
      <TooltipTrigger asChild>{toggleButton}</TooltipTrigger>
      <TooltipContent {...tooltipOptions}>
        <div className="flex flex-col items-center text-center">{tooltip}</div>
      </TooltipContent>
    </Tooltip>
  );
};

ToolbarButton.displayName = TOOLBAR_BUTTON_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ToolbarButton };

export type { ToolbarButtonProps };
