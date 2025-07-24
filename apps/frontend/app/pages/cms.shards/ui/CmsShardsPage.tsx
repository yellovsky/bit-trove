import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PlusCircle } from 'lucide-react';
import { type FC, useMemo } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { useTranslation } from 'react-i18next';

import { type ShortShard, shortArticlesGetSortSchema } from '@repo/api-models';
import { Button } from '@repo/ui/components/Button';
import { Link } from '@repo/ui/components/Link';
import { ScrollArea } from '@repo/ui/components/ScrollArea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/components/Table';
import { Heading } from '@repo/ui/components/Typography';

import { useTableQueryPagination } from '@shared/lib/use-table-query-pagination';
import { useTableQuerySorting } from '@shared/lib/use-table-query-sorting';
import { Pagination } from '@shared/ui/Pagination';
import { SortableTableHeader } from '@shared/ui/SortableTableHeader';

import { getCreateShardLink } from '@features/shards';

import { useMyShortShardsQuery } from '@entities/shards';

import { DEFAULT_SORT, NO_DATA } from '../model/constants';
import { ShardPublishSwitch } from './ShardPublishSwitch';
import { ShardTableMenu } from './ShardTableMenu';

const columnHelper = createColumnHelper<ShortShard>();

const useColumns = () => {
  const { t: tBlogPosts, i18n } = useTranslation('blog_posts');
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
        header: tBlogPosts('upsert_blog_post_form.title.label'),
      }),
      columnHelper.accessor('slug', {
        enableSorting: false,
        header: tBlogPosts('upsert_blog_post_form.slug.label'),
      }),
      columnHelper.accessor('languageCode', {
        enableSorting: false,
        header: tBlogPosts('upsert_blog_post_form.language_code.label'),
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
    [dateFormatter, tCms, tBlogPosts]
  );
};

/* -------------------------------------------------------------------------------------------------
 * CmsShardsPage
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'CmsShardsPage';

const CmsShardsPage: FC = () => {
  'use no memo';
  const { t, i18n } = useTranslation();
  const { t: tShards } = useTranslation('shards');
  const { pagination, setPagination, setPage } = useTableQueryPagination();
  const { sorting, sort, setSorting } = useTableQuerySorting(shortArticlesGetSortSchema, DEFAULT_SORT);

  const shardsQuery = useMyShortShardsQuery({
    locale: i18n.language,
    page: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
    },
    sort,
  });

  const data = shardsQuery.data?.data.items ?? NO_DATA;
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

        <Button asChild>
          <Link to={getCreateShardLink()}>
            <PlusCircle />
            {tShards('create_shard_button.text')}
          </Link>
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
        </ScrollArea>
      </div>

      <Pagination
        className="mt-4 justify-end"
        currentPage={pagination.pageIndex + 1}
        onPageChange={setPage}
        pagesCount={Math.ceil(rowCount / pagination.pageSize)}
      />
    </div>
  );
};

CmsShardsPage.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { CmsShardsPage };
