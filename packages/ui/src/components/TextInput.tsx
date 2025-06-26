import type { ComponentProps, FC, ReactNode } from 'react';

import { cn } from '@repo/ui/lib/utils';

import styles from './TextInput.module.css';

export interface TextInputProps extends ComponentProps<'input'> {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

export const TextInput: FC<TextInputProps> = ({ className, leftElement, rightElement, ...props }) => {
  return (
    <div className={cn(className, styles.textInput)}>
      {leftElement && <div className={styles.leftSection}>{leftElement}</div>}
      <input {...props} />
      {rightElement && <div className={styles.rightSection}>{rightElement}</div>}
    </div>
  );
};
