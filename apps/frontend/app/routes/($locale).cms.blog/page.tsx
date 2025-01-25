// common modules
import type { BlogPostSegment } from '@repo/api-models';
import { page as pageCn } from './page.module.scss';
import { useLocale } from '@repo/remix-i18n';
import { useTranslation } from 'react-i18next';
import { type FC, useMemo, useState } from 'react';

import {
  type ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  type PaginationState,
  useReactTable,
} from '@tanstack/react-table';

// common modules
import { Heading } from '~/components/heading';
import { Link } from '~/components/link';
import { TableWithData } from '~/components/table';
import { useCMSBlogPostList } from '~/api/blog-post';

const columnHelper = createColumnHelper<BlogPostSegment | null>();

const useColumns = (): ColumnDef<BlogPostSegment | null, any>[] => {
  const { t: tBlogCMS } = useTranslation('blog-cms');
  const locale = useLocale();

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
    [locale],
  );

  return useMemo(
    () => [
      columnHelper.accessor('slug', { header: tBlogCMS('SLUG_COLUMN') }),
      columnHelper.accessor('created_at', {
        cell: ({ getValue }) => dateFormatter.format(new Date(getValue())),
        header: tBlogCMS('ORIGINAL_LANGUAGE_COLUMN'),
      }),
      columnHelper.accessor('published_at', {
        cell: ({ getValue }) => {
          const value = getValue();
          return !value ? '--' : dateFormatter.format(new Date(value));
        },
        header: tBlogCMS('PUBLISHED_AT_COLUMN'),
      }),
      columnHelper.display({
        cell: row => (
          <Link to={`/cms/blog/edit/${row.row.original?.id}`} variant="text">
            {tBlogCMS('EDIT_ACTION')}
          </Link>
        ),
        id: 'actions',
      }),
    ],
    [tBlogCMS, dateFormatter],
  );
};

export const CMSBlogPage: FC = () => {
  const { t } = useTranslation();
  const columns = useColumns();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data } = useCMSBlogPostList({
    locale: 'en',
    page: { limit: 10, offset: 0 },
    sort: 'created_at',
  });

  const table = useReactTable({
    columns,
    data: data?.data || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });

  return (
    <div className={pageCn}>
      <Heading as="h1" className="mb-8" size="lg">
        {t('BLOG_PAGE_TITLE')}
      </Heading>

      <TableWithData table={table} />
    </div>
  );
};
