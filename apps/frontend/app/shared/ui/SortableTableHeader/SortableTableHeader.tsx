import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
import type { FC } from 'react';

import { TableHead } from '@repo/ui/components/Table';

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
    <TableHead className={styles.th}>
      <button className={styles.control} onClick={onSort} type="button">
        <div className="flex flex-nowrap justify-between">
          <div className="font-bold text-sm">{children}</div>
          <div className={styles.icon}>
            <Icon size={16} stroke={1.5} />
          </div>
        </div>
      </button>
    </TableHead>
  );
};
