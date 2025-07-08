import type { FC, HTMLAttributes } from 'react';

type SpacerOrientation = 'horizontal' | 'vertical';

interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: SpacerOrientation;
  size?: string | number;
}

export const Spacer: FC<SpacerProps> = ({ orientation = 'horizontal', size, className = '', style = {}, ...props }) => {
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

Spacer.displayName = 'Spacer';
