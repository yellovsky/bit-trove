import { Button, Group, Pagination, Table, Title } from '@mantine/core';
import { IconCirclePlusFilled } from '@tabler/icons-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Fragment } from 'react/jsx-runtime';
import { useTranslation } from 'react-i18next';

import { getManyShardsSortSchema, type ShortShard } from '@repo/api-models';

import { useTableQueryPagination } from '@shared/lib/use-table-query-pagination';
import { useTableQuerySorting } from '@shared/lib/use-table-query-sorting';
import { Link } from '@shared/ui/link';
import { SortableTableHeader } from '@shared/ui/SortableTableHeader';

import { getCreateShardLink } from '@features/shards';

import { useMyManyShardsQuery } from '@entities/shards';

const columnHelper = createColumnHelper<ShortShard>();

const columns = [
  columnHelper.accessor('title', {
    cell: (info) => info.getValue(),
    enableSorting: true,
    header: 'Title',
  }),
  columnHelper.accessor('slug', {
    cell: (info) => <i>{info.getValue()}</i>,
    enableSorting: false,
    header: 'Slug',
  }),
  columnHelper.accessor('languageCode', {
    cell: (info) => info.renderValue(),
    enableSorting: false,
    header: 'Language',
  }),
  columnHelper.accessor('createdAt', {
    cell: (info) => <i>{info.getValue()}</i>,
    enableSorting: true,
    header: 'Created At',
  }),
];

const NO_DATA: ShortShard[] = [];
const DEFAULT_SORT = '-createdAt';

const Page = () => {
  'use no memo';
  const { i18n } = useTranslation();
  const { pagination, setPagination } = useTableQueryPagination();
  const { sorting, sort, setSorting } = useTableQuerySorting(getManyShardsSortSchema, DEFAULT_SORT);

  const shardsQuery = useMyManyShardsQuery({
    locale: i18n.language,
    page: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
    },
    sort,
  });

  const data = shardsQuery.data?.data.items ?? NO_DATA;
  const total = shardsQuery.data?.data.pagination.total ?? 0;
  const pagesCount = Math.ceil(total / pagination.pageSize);
  const rowCount = shardsQuery.data?.data.pagination.total ?? 0;

  const table = useReactTable({
    columns,
    data,
    debugColumns: true,
    debugHeaders: true,
    debugTable: true,
    enableMultiSort: false,
    enableSortingRemoval: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount,
    state: { pagination, sorting },
  });

  return (
    <div>
      <Group justify="space-between" mb="lg">
        <Title>Shards</Title>

        <Button
          component={Link}
          leftSection={<IconCirclePlusFilled />}
          to={getCreateShardLink()}
          underline="never"
          variant="light"
        >
          New
        </Button>
        {/* <Link   to={getCreateShardLink()}>Create</Link> */}
      </Group>

      <Table highlightOnHover horizontalSpacing="md" miw={700} striped verticalSpacing="xs">
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Fragment key={header.id}>
                  {header.isPlaceholder ? null : !header.column.getCanSort() ? (
                    <Table.Th>{flexRender(header.column.columnDef.header, header.getContext())}</Table.Th>
                  ) : (
                    <SortableTableHeader
                      onSort={() => header.column.toggleSorting(header.column.getIsSorted() === 'asc')}
                      reversed={header.column.getIsSorted() === 'desc'}
                      sorted={!!header.column.getIsSorted()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </SortableTableHeader>
                  )}
                </Fragment>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>

        <Table.Tbody>
          {table.getRowModel().rows.map((row) => (
            <Table.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Group justify="flex-end" mt="md">
        <Pagination boundaries={1} defaultValue={1} total={pagesCount} />
      </Group>
    </div>
  );
};

export default function CMSShardsRoute() {
  return <Page />;
}
