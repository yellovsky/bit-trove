import { Button, Container, Group, Text, Title } from '@mantine/core';
import type { FC, ReactNode } from 'react';

import styles from './ErrorScreen.module.css';

interface ErrorScreenProps {
  code: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  buttonText: ReactNode;
  onButtonClick?: () => void;
}

export const ErrorScreen: FC<ErrorScreenProps> = ({ code, title, subtitle, buttonText, onButtonClick }) => (
  <Container className={styles.root}>
    <div className={styles.inner}>
      <div className={styles.image}>{code}</div>
      <div className={styles.content}>
        <Title className={styles.title}>{title}</Title>
        <Text c="dimmed" className={styles.description} size="lg" ta="center">
          {subtitle}
        </Text>
        <Group justify="center">
          <Button onClick={onButtonClick} size="md">
            {buttonText}
          </Button>
        </Group>
      </div>
    </div>
  </Container>
);
