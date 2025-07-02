import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PlusCircle } from 'lucide-react';
import { useMemo } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { useTranslation } from 'react-i18next';

import { getManyShardsSortSchema, type ShortShard } from '@repo/api-models';
import { Button } from '@repo/ui/components/button';
import { Link } from '@repo/ui/components/link';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@repo/ui/components/Pagination';
import { ScrollArea } from '@repo/ui/components/ScrollArea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/components/Table';
import { Heading } from '@repo/ui/components/Typography';

import { useTableQueryPagination } from '@shared/lib/use-table-query-pagination';
import { useTableQuerySorting } from '@shared/lib/use-table-query-sorting';
import { SortableTableHeader } from '@shared/ui/SortableTableHeader';

import { getCreateShardLink } from '@features/shards';

import { useMyManyShardsQuery } from '@entities/shards';

import { ShardPublishSwitch } from './ShardPublishSwitch';
import { ShardTableMenu } from './ShardTableMenu';

const columnHelper = createColumnHelper<ShortShard>();

const useColumns = () => {
  const { t: tShards, i18n } = useTranslation('shards');
  const { t: tCms } = useTranslation('cms');

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
    [i18n.language]
  );

  return useMemo(
    () => [
      columnHelper.accessor('title', {
        enableSorting: true,
        header: tShards('upsert_shard_form.title.label'),
      }),
      columnHelper.accessor('slug', {
        enableSorting: false,
        header: tShards('upsert_shard_form.slug.label'),
      }),
      columnHelper.accessor('languageCode', {
        enableSorting: false,
        header: tShards('upsert_shard_form.language_code.label'),
      }),
      columnHelper.accessor('createdAt', {
        cell: (info) => <div className="text-nowrap">{dateFormatter.format(new Date(info.getValue()))}</div>,
        enableSorting: true,
        header: tCms('created_at'),
      }),
      columnHelper.display({
        cell: (row) => (!row.row.original ? null : <ShardPublishSwitch shard={row.row.original} />),
        header: tCms('published'),
        id: 'published',
      }),
      columnHelper.display({
        cell: (row) => (!row.row.original ? null : <ShardTableMenu shard={row.row.original} />),
        id: 'actions',
      }),
    ],
    [dateFormatter, tCms, tShards]
  );
};

const NO_DATA: ShortShard[] = [];
const DEFAULT_SORT = '-createdAt';

const Page = () => {
  'use no memo';
  const { t, i18n } = useTranslation();
  const { t: tShards } = useTranslation('shards');
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
  // const total = shardsQuery.data?.data.pagination.total ?? 0;
  // const pagesCount = Math.ceil(total / pagination.pageSize);
  const rowCount = shardsQuery.data?.data.pagination.total ?? 0;
  const columns = useColumns();

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
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount,
    state: { pagination, sorting },
  });

  return (
    <div data-tmp>
      <div className="mb-4 flex justify-between">
        <Heading className="mb-4" order={2}>
          {t('menu_items.shards.title')}
        </Heading>

        <Button asChild leftElement={<PlusCircle />}>
          <Link to={getCreateShardLink()}>{tShards('create_shard_button.text')}</Link>
        </Button>
      </div>

      <div className="grid">
        <ScrollArea>
          <Table className="min-w-[700px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Fragment key={header.id}>
                      {header.isPlaceholder ? null : !header.column.getCanSort() ? (
                        <TableHead>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
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
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* </MantineTable.ScrollContainer> */}
        </ScrollArea>
      </div>

      <div className="mt-4 flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default function CMSShardsRoute() {
  return <Page />;
}
