// global modules
import clsx from 'clsx';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { type FC, Fragment, type PropsWithChildren, type ReactNode } from 'react';

// common modules
import { Icon } from '~/components/icon';
import { IconButton } from '~/components/icon-button';

// local modules
import { ModalTitle } from './modal.title';

import {
  backdrop as backdropCn,
  dialog as dialogCn,
  enterAnimation as enterAnimationCn,
  holder as holderCn,
  leaveAnimation as leaveAnimationCn,
  medium as mediumCn,
  narrow as narrowCn,
  panel as panelCn,
  standaloneClose as standaloneCloseCn,
  wide as wideCn,
} from './modal.module.scss';

type ModalPanelWidthType = 'narrow' | 'medium' | 'wide';

export interface ModalProps extends PropsWithChildren {
  opened: boolean;
  onClose: () => void;
  afterTransitionEnd?: () => void;
  widthType?: ModalPanelWidthType;
  panelClassName?: string;
  title?: ReactNode;
  logo?: ReactNode;
  subtitle?: ReactNode;
}

export const Modal: FC<ModalProps> = ({
  children,
  onClose,
  opened,
  afterTransitionEnd,
  widthType = 'narrow',
  panelClassName,
  title,
  logo,
  subtitle,
}) => {
  return (
    <Transition appear afterLeave={afterTransitionEnd} as={Fragment} show={opened}>
      <Dialog className={dialogCn} onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter={enterAnimationCn}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={leaveAnimationCn}
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={backdropCn} />
        </TransitionChild>

        <div className={holderCn}>
          <TransitionChild
            as={Fragment}
            enter={enterAnimationCn}
            enterFrom={clsx('opacity-0', 'scale-95')}
            enterTo={clsx('opacity-100', 'scale-100')}
            leave={leaveAnimationCn}
            leaveFrom={clsx('opacity-100', 'scale-100')}
            leaveTo={clsx('opacity-0', 'scale-95')}
          >
            <DialogPanel
              className={clsx(
                panelCn,
                !panelClassName && widthType === 'narrow' && narrowCn,
                !panelClassName && widthType === 'medium' && mediumCn,
                !panelClassName && widthType === 'wide' && wideCn,
                panelClassName,
              )}
            >
              {title ? (
                <ModalTitle logo={logo} onClose={onClose} subtitle={subtitle} title={title} />
              ) : (
                <div className={standaloneCloseCn}>
                  <IconButton onClick={onClose} size="xs" variant="text">
                    <Icon type="cross" />
                  </IconButton>
                </div>
              )}

              {children}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
