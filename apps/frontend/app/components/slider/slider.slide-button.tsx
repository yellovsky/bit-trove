// global modules
import type { FC, MouseEventHandler } from 'react';

// common modules
import { Icon } from '~/components/icon';
import { IconButton } from '~/components/icon-button';

// local modules
import { slideButton as slideButtonCn } from './slider.module.scss';

interface SlideButtonProps {
  disabled?: boolean;
  direction: 'left' | 'right';
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const SlideButton: FC<SlideButtonProps> = props => {
  return (
    <IconButton
      className={slideButtonCn}
      disabled={props.disabled}
      onClick={props.onClick}
      variant="soft"
    >
      <Icon type={props.direction} />
    </IconButton>
  );
};
