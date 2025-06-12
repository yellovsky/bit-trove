import { Center, Group, Table, Text, UnstyledButton } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
import type { FC } from 'react';

import styles from './SortableTableHeader.module.css';

interface SorttableTableHeaderProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort?: () => void;
}

export const SortableTableHeader: FC<SorttableTableHeaderProps> = ({ children, reversed, sorted, onSort }) => {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

  return (
    <Table.Th className={styles.th}>
      <UnstyledButton className={styles.control} onClick={onSort}>
        <Group justify="space-between">
          <Text fw="bold" fz="sm">
            {children}
          </Text>
          <Center className={styles.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
};
