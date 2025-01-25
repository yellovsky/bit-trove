// global modules
import * as R from 'ramda';
import clsx from 'clsx';
import { Icon } from '~/components/icon';
import type { FC, HTMLAttributes, ReactNode } from 'react';

// local modules
import styles from './error-divider.module.scss';

interface ErrorDividerProps extends HTMLAttributes<HTMLDivElement> {
  bottom?: ReactNode;
  bottomErrorId?: string;
  minLines?: number;
  top?: ReactNode;
  topErrorId?: string;
}

export const ErrorDivider: FC<ErrorDividerProps> = props => {
  const { className, minLines = 1, bottom, bottomErrorId, top, topErrorId, ...rest } = props;

  const errorPlaceholder = R.repeat('\u00A0', minLines + 1).join('\n');

  return (
    <div className={clsx(className, styles.holder)} {...rest}>
      <div className={styles.placeholder}>{errorPlaceholder}</div>
      <div
        className={clsx(
          styles.message,
          top && !bottom && styles.top,
          bottom && !top && styles.bottom,
          top && bottom && styles.both,
        )}
      >
        {top && (
          <div className={styles.errorHolder} id={topErrorId}>
            <Icon aria-hidden="true" type="warningCircle" />
            {top}
          </div>
        )}
        {top && bottom && '\u00A0'}
        {bottom && (
          <div className={styles.errorHolder} id={bottomErrorId}>
            <Icon aria-hidden="true" type="warningCircle" />
            {bottom}
          </div>
        )}
      </div>
    </div>
  );
};
