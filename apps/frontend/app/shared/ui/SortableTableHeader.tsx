import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
import type { FC } from 'react';

import { TableHead } from '@repo/ui/components/Table';

interface SorttableTableHeaderProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort?: () => void;
}

export const SortableTableHeader: FC<SorttableTableHeaderProps> = ({ children, reversed, sorted, onSort }) => {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

  return (
    <TableHead className="p-0 font-bold">
      <button className="w-full p-2 hover:bg-gray-2" onClick={onSort} type="button">
        <div className="flex flex-nowrap justify-between">
          <div className="font-bold text-sm">{children}</div>
          <div className="size-5 rounded-full">
            <Icon size={16} stroke={1.5} />
          </div>
        </div>
      </button>
    </TableHead>
  );
};
