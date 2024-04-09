// global modules
import type { FC, PropsWithChildren } from 'react';

// local modules

interface ModalProps extends PropsWithChildren {}

export const Modal: FC<ModalProps> = ({ children }) => {
  return <div> modal {children}</div>;
};
