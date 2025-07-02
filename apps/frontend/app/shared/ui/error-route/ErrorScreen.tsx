import type { FC, ReactNode } from 'react';

import { Button } from '@repo/ui/components/Button';
import { Heading } from '@repo/ui/components/Typography';
import { cn } from '@repo/ui/lib/utils';

import styles from './ErrorScreen.module.css';

interface ErrorScreenProps {
  code: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  buttonText: ReactNode;
  onButtonClick?: () => void;
}

export const ErrorScreen: FC<ErrorScreenProps> = ({ code, title, subtitle, buttonText, onButtonClick }) => (
  <div className={styles.root}>
    <div className={styles.inner}>
      <div className={styles.image}>{code}</div>
      <div className={styles.content}>
        <Heading className={styles.title} order={1}>
          {title}
        </Heading>
        <div className={cn(styles.description, 'text-center text-lg text-muted-foreground')}>{subtitle}</div>
        <div className="flex justify-center">
          <Button onClick={onButtonClick} size="md">
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  </div>
);
