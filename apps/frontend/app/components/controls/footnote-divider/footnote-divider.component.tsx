// global modules
import * as R from 'ramda';
import clsx from 'clsx';
import type { FC, HTMLAttributes, ReactNode } from 'react';

// common modules
import { Icon } from '~/components/icon';

// local modules
import styles from './footnote-divider.module.scss';

export interface FootnoteDividerProps extends HTMLAttributes<HTMLDivElement> {
  bottomFootnote?: ReactNode;
  bottomError?: ReactNode;
  minLines?: number;
  topFootnote?: ReactNode;
  topError?: ReactNode;
}

export const FootnoteDivider: FC<FootnoteDividerProps> = props => {
  const {
    className,
    minLines = 1,
    bottomFootnote,
    bottomError,
    topFootnote,
    topError,
    ...rest
  } = props;

  const footnotePlaceholder = R.repeat('\u00A0', minLines + 1).join('\n');
  const top = topError || topFootnote;
  const bottom = bottomError || bottomFootnote;
  const holderClassName = clsx(className, styles.holder, (bottomError || topError) && styles.error);
  const messageClassName = clsx(
    styles.message,
    top && !bottom && styles.top,
    bottom && !top && styles.bottom,
    top && bottom && styles.both,
  );

  return (
    <div {...rest} className={holderClassName}>
      <div className={styles.placeholder}>{footnotePlaceholder}</div>
      <div className={messageClassName}>
        {top && (
          <div className={styles.footnoteHolder}>
            {topError && (
              <div className={styles.errorIconHolder}>
                <Icon aria-hidden="true" className={styles.errorIcon} type="warningCircle" />
              </div>
            )}
            {top}
          </div>
        )}
        {top && bottom && '\u00A0'}
        {bottom && (
          <div className={styles.footnoteHolder}>
            {bottomError && <Icon aria-hidden="true" type="warningCircle" />}
            {bottom}
          </div>
        )}
      </div>
    </div>
  );
};
