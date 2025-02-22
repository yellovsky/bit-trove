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
import { getCMSTutorialEditRouteLink } from '~/utils/links';
import { Heading } from '~/components/heading';
import { Link } from '~/components/link';
import { TableWithData } from '~/components/table';
import { useDateFormatter } from '~/utils/formatter';
import { type FetchCMSTutorialListVariables, useCMSTutorialListQuery } from '~/api/tutorial';

const columnHelper = createColumnHelper<BlogPostSegment | null>();

const useColumns = (): ColumnDef<BlogPostSegment | null, any>[] => {
  const { t: tBlogCMS } = useTranslation('cms');
  const dateFormatter = useDateFormatter();

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
        cell: row =>
          !row.row.original ? null : (
            <Link to={getCMSTutorialEditRouteLink(row.row.original)} variant="text">
              {tBlogCMS('EDIT_ACTION')}
            </Link>
          ),
        id: 'actions',
      }),
    ],
    [tBlogCMS, dateFormatter],
  );
};

export const CMSTutorialsPage: FC = () => {
  const { t } = useTranslation();
  const columns = useColumns();
  const locale = useLocale();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const variables = useMemo(
    (): FetchCMSTutorialListVariables => ({ locale, sort: 'created_at' }),
    [locale],
  );

  const cmsTutorialListQuery = useCMSTutorialListQuery(variables, pagination);

  const data = useMemo(() => cmsTutorialListQuery.data?.data || [], [cmsTutorialListQuery.data]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });

  return (
    <div className={pageCn}>
      <Heading as="h1" className="mb-8" size="lg">
        {t('TUTORIALS_PAGE_TITLE')}
      </Heading>

      <TableWithData table={table} />
    </div>
  );
};
