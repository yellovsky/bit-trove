// global modules
import { useTranslation } from 'react-i18next';
import { type FC, useCallback, useMemo, useState } from 'react';
import type { PermissionPolicy, SortWithDirection } from '@repo/api-models';

import {
  type CellContext,
  type ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

// common modules
import { CMSPageTitle } from '~/components/cms-page-title';
import { EmptyText } from '~/components/empty-text';
import { LinkButton } from '~/components/link';
import { Modal } from '~/components/modal';
import { TablePagination } from '~/components/table-pagination';
import { useDateTimeFormatter } from '~/utils/formatter';
import { useSearchPaginationState } from '~/utils/pagination';
import { useSearchSortingState } from '~/utils/sort';
import { TablePaginationHolder, TableWithData } from '~/components/table';

import {
  type GetCMSPermissionPolicyListVariables,
  useCMSPermissionPolicyListQuery,
} from '~/api/permission-policy';

// local modules
import { CreateModalConent } from './create-modal-conent';
import { EditModalConent } from './edit-modal-conent';
import { PermissionPolicyDeleteConfirmation } from './delete-confirmation';
import { cell as cellCn, page as pageCn } from './page.module.scss';

const renderCell = (ctx: CellContext<PermissionPolicy, any>) => (
  <span className={cellCn}>{ctx.getValue()}</span>
);

const columnHelper = createColumnHelper<PermissionPolicy>();
const useColumns = (
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
): ColumnDef<PermissionPolicy, any>[] => {
  const { t: cmsT } = useTranslation('cms');
  const dateTimeFormatter = useDateTimeFormatter();

  return useMemo(
    () => [
      columnHelper.accessor('sub', {
        cell: renderCell,
        enableSorting: false,
        header: cmsT('Subject'),
      }),
      columnHelper.accessor('act', {
        cell: renderCell,
        enableSorting: false,
        header: cmsT('Action'),
      }),
      columnHelper.accessor('obj_type', {
        cell: renderCell,
        enableSorting: false,
        header: cmsT('Obj. Type'),
      }),
      columnHelper.accessor('cond', {
        cell: renderCell,
        enableSorting: false,
        header: cmsT('Condition'),
      }),
      columnHelper.accessor('created_at', {
        cell: ctx => (
          <div className={cellCn}>{dateTimeFormatter.format(new Date(ctx.getValue()))}</div>
        ),
        header: cmsT('CREATED_AT_COLUMN'),
      }),
      columnHelper.display({
        cell: row => {
          const id = row.row.original?.id;

          return !id ? null : (
            <>
              <LinkButton onClick={() => onEdit(id)} variant="standalone">
                {cmsT('EDIT_ACTION')}
              </LinkButton>{' '}
              <LinkButton onClick={() => onDelete(id)} variant="standalone">
                {cmsT('Delete')}
              </LinkButton>
            </>
          );
        },
        id: 'actions',
      }),
    ],
    [],
  );
};

const NO_DATA: (PermissionPolicy | null)[] = [] as const;
const isPermissionPolicySort = (val: string): val is SortWithDirection<'created_at'> =>
  val === 'created_at' || val === '-created_at';

export const CMSPermissionsPage: FC = () => {
  const [editID, updateEditID] = useState<string | undefined>();
  const [deleteID, updateDeleteID] = useState<string | undefined>();
  const [showCreateModal, updateShowCreateModal] = useState(false);
  const clearEditID = useCallback(() => updateEditID(undefined), []);
  const clearDeleteID = useCallback(() => updateDeleteID(undefined), []);
  const openCreateModal = useCallback(() => updateShowCreateModal(true), []);
  const closeCreateModal = useCallback(() => updateShowCreateModal(false), []);

  const columns = useColumns(updateEditID, updateDeleteID);
  const { t: cmsT } = useTranslation('cms');

  const [pagination, onPaginationChange] = useSearchPaginationState();
  const [sorting, sort, onSortingChange] = useSearchSortingState<'created_at'>(
    '-created_at',
    isPermissionPolicySort,
  );

  const fp = useMemo<GetCMSPermissionPolicyListVariables>(
    () => ({ filter: { ptype: 'p' }, sort }),
    [sort],
  );

  const policyListQuery = useCMSPermissionPolicyListQuery(fp, pagination);
  const data = (policyListQuery.data?.data || NO_DATA).filter(val => !!val);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    onPaginationChange,
    onSortingChange,
    rowCount: policyListQuery.data?.meta.pagination.total,
    state: { pagination, sorting },
  });

  return (
    <>
      <div className={pageCn}>
        <CMSPageTitle onCreateClick={openCreateModal}>{cmsT('Permission Policies')}</CMSPageTitle>

        <TableWithData className="mb-4" table={table} />

        {data.length ? null : <EmptyText>{cmsT('Nothing is found')}</EmptyText>}

        <TablePaginationHolder>
          <TablePagination
            canNextPage={table.getCanNextPage()}
            canPrevPage={table.getCanPreviousPage()}
            currentIndex={pagination.pageIndex}
            onNextPage={() => table.nextPage()}
            onPageSelect={table.setPageIndex.bind(table)}
            onPrevPage={() => table.previousPage()}
            pagesCount={table.getPageCount()}
          />
        </TablePaginationHolder>
      </div>
      <Modal
        onClose={clearEditID}
        opened={!!editID}
        title={cmsT('Edit Permission Policy')}
        widthType="medium"
      >
        {!editID ? null : <EditModalConent id={editID} onSuccess={clearEditID} />}
      </Modal>
      <Modal
        onClose={clearDeleteID}
        opened={!!deleteID}
        title={cmsT('Confirm deletion')}
        widthType="medium"
      >
        {!deleteID ? null : (
          <PermissionPolicyDeleteConfirmation
            id={deleteID}
            onCancel={clearDeleteID}
            onSuccess={clearDeleteID}
          />
        )}
      </Modal>

      <Modal
        onClose={closeCreateModal}
        opened={showCreateModal}
        title={cmsT('Create Privacy Policy')}
        widthType="medium"
      >
        <CreateModalConent onSuccess={closeCreateModal} />
      </Modal>
    </>
  );
};
