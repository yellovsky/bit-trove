// global modules
import type { FC, PropsWithChildren } from 'react';

// local modules
import { emptyText as emptyTextCn } from './empty-text.module.scss';

export const EmptyText: FC<PropsWithChildren> = ({ children }) => (
  <div className={emptyTextCn}>{children}</div>
);
