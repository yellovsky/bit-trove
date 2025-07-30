import type { ComponentProps, FC } from 'react';

/* -------------------------------------------------------------------------------------------------
 * Spacer
 * -----------------------------------------------------------------------------------------------*/
const SPACER_NAME = 'Spacer';

type SpacerOrientation = 'horizontal' | 'vertical';

type SpacerProps = ComponentProps<'div'> & {
  orientation?: SpacerOrientation;
  size?: string | number;
};

const Spacer: FC<SpacerProps> = ({ orientation = 'horizontal', size, className, style = {}, ...props }) => {
  const computedStyle = {
    ...style,
    ...(orientation === 'horizontal' && !size && { flex: 1 }),
    ...(size && {
      height: orientation === 'horizontal' ? '1px' : size,
      width: orientation === 'vertical' ? '1px' : size,
    }),
  };

  return <div {...props} className={className} style={computedStyle} />;
};

Spacer.displayName = SPACER_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { Spacer };

export type { SpacerProps, SpacerOrientation };
