// global modules
import clsx from 'clsx';
import { flexRender, type Table as TranstackTable } from '@tanstack/react-table';

// local modules
import { active as activeCn, sortable as sortableCn } from './table.module.scss';
import { Table, TBody, Td, Th, THead, Tr } from './table.component';

interface TableWithDataProps<TData> {
  className?: string;
  table: TranstackTable<TData>;
}

export const TableWithData = <TData,>({ className, table }: TableWithDataProps<TData>) => (
  <Table className={className}>
    <THead>
      {table.getHeaderGroups().map(headerGroup => (
        <Tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <Th key={header.id}>
              {header.isPlaceholder ? null : (
                <div
                  className={clsx(
                    header.column.getCanSort() && sortableCn,
                    !!header.column.getIsSorted() && activeCn,
                  )}
                  onClick={() => header.column.toggleSorting(header.column.getIsSorted() === 'asc')}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}{' '}
                  {header.column.getIsSorted() === 'asc' ? <span>&#9650;</span> : null}
                  {header.column.getIsSorted() === 'desc' ? <span>&#9660;</span> : null}
                </div>
              )}
            </Th>
          ))}
        </Tr>
      ))}
    </THead>
    <TBody>
      {table.getRowModel().rows.map(row => (
        <Tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
          ))}
        </Tr>
      ))}
    </TBody>
  </Table>
);
