import type { TooltipContentProps } from '@radix-ui/react-tooltip';
import type { ComponentProps, FC } from 'react';

import { Toggle } from '@repo/ui/components/Toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@repo/ui/components/tooltip';

interface ToolbarButtonProps extends ComponentProps<typeof Toggle> {
  isActive?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipContentProps;
}

export const ToolbarButton: FC<ToolbarButtonProps> = ({ children, tooltip, className, tooltipOptions, ...props }) => {
  const toggleButton = (
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

ToolbarButton.displayName = 'ToolbarButton';

export default ToolbarButton;
