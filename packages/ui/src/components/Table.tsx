import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Table
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Table';

type TableProps = ComponentProps<'table'>;

const Table: FC<TableProps> = ({ className, ...props }) => (
  <div className="relative w-full overflow-x-auto" data-slot="table-container">
    <table className={cn('w-full caption-bottom text-sm', className)} data-slot="table" {...props} />
  </div>
);

Table.displayName = NAME;

/* -------------------------------------------------------------------------------------------------
 * TableHeader
 * -----------------------------------------------------------------------------------------------*/
const TABLE_HEADER_NAME = 'TableHeader';

type TableHeaderProps = ComponentProps<'thead'>;

const TableHeader: FC<TableHeaderProps> = ({ className, ...props }) => (
  <thead className={cn('[&_tr]:border-b', className)} data-slot="table-header" {...props} />
);

TableHeader.displayName = TABLE_HEADER_NAME;

/* -------------------------------------------------------------------------------------------------
 * TableBody
 * -----------------------------------------------------------------------------------------------*/
const TABLE_BODY_NAME = 'TableBody';

type TableBodyProps = ComponentProps<'tbody'>;

const TableBody: FC<TableBodyProps> = ({ className, ...props }) => (
  <tbody className={cn('[&_tr:last-child]:border-0', className)} data-slot="table-body" {...props} />
);

TableBody.displayName = TABLE_BODY_NAME;

/* -------------------------------------------------------------------------------------------------
 * TableFooter
 * -----------------------------------------------------------------------------------------------*/
const TABLE_FOOTER_NAME = 'TableFooter';

type TableFooterProps = ComponentProps<'tfoot'>;

const TableFooter: FC<TableFooterProps> = ({ className, ...props }) => (
  <tfoot
    className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    data-slot="table-footer"
    {...props}
  />
);

TableFooter.displayName = TABLE_FOOTER_NAME;

/* -------------------------------------------------------------------------------------------------
 * TableRow
 * -----------------------------------------------------------------------------------------------*/
const TABLE_ROW_NAME = 'TableRow';

type TableRowProps = ComponentProps<'tr'>;

const TableRow: FC<TableRowProps> = ({ className, ...props }) => (
  <tr
    className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)}
    data-slot="table-row"
    {...props}
  />
);

TableRow.displayName = TABLE_ROW_NAME;

/* -------------------------------------------------------------------------------------------------
 * TableHead
 * -----------------------------------------------------------------------------------------------*/
const TABLE_HEAD_NAME = 'TableHead';

type TableHeadProps = ComponentProps<'th'>;

const TableHead: FC<TableHeadProps> = ({ className, ...props }) => (
  <th
    className={cn(
      'h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    data-slot="table-head"
    {...props}
  />
);

TableHead.displayName = TABLE_HEAD_NAME;

/* -------------------------------------------------------------------------------------------------
 * TableCell
 * -----------------------------------------------------------------------------------------------*/
const TABLE_CELL_NAME = 'TableCell';

type TableCellProps = ComponentProps<'td'>;

const TableCell: FC<TableCellProps> = ({ className, ...props }) => (
  <td
    className={cn(
      'whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    data-slot="table-cell"
    {...props}
  />
);

TableCell.displayName = TABLE_CELL_NAME;

/* -------------------------------------------------------------------------------------------------
 * TableCaption
 * -----------------------------------------------------------------------------------------------*/
const TABLE_CAPTION_NAME = 'TableCaption';

type TableCaptionProps = ComponentProps<'caption'>;

const TableCaption: FC<TableCaptionProps> = ({ className, ...props }) => (
  <caption className={cn('mt-4 text-muted-foreground text-sm', className)} data-slot="table-caption" {...props} />
);

TableCaption.displayName = TABLE_CAPTION_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = Table;
const Header = TableHeader;
const Body = TableBody;
const Footer = TableFooter;
const Head = TableHead;
const Row = TableRow;
const Cell = TableCell;
const Caption = TableCaption;

export {
  Root,
  Header,
  Body,
  Footer,
  Head,
  Row,
  Cell,
  Caption,
  //
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
};
