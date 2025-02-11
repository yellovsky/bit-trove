// global modules
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

// common modules
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { IconButton } from '~/components/icon-button';

// local modules
import {
  logo as logoCn,
  modalHeader as modalHeaderCn,
  subtitle as subtitleCn,
  texts as textsCn,
  withSubtitle as withSubtitleCn,
} from './modal.module.scss';

export interface ModalTitleProps {
  onClose: () => void;
  title: ReactNode;
  logo?: ReactNode;
  subtitle?: ReactNode;
}

export const ModalTitle: FC<ModalTitleProps> = ({ onClose, title, logo, subtitle }) => {
  return (
    <div className={clsx(modalHeaderCn, subtitle && withSubtitleCn)}>
      {!logo ? null : <div className={clsx(logoCn, subtitle && withSubtitleCn)}>{logo}</div>}
      <div className={textsCn}>
        <Heading as="h4" size="sm">
          {title}
        </Heading>
        {!subtitle ? null : <div className={subtitleCn}>{subtitle}</div>}
      </div>
      <div>
        <IconButton onClick={onClose} size="xs" variant="text">
          <Icon type="cross" />
        </IconButton>
      </div>
    </div>
  );
};
