// global modules
import clsx from 'clsx';
import type { FC, HTMLAttributes, TableHTMLAttributes } from 'react';

// local modules
import {
  table as tableCn,
  tbody as tbodyCn,
  td as tdCn,
  th as thCn,
  thead as theadCn,
  tr as trCn,
} from './table.module.scss';

export const Table: FC<TableHTMLAttributes<HTMLTableElement>> = props => (
  <table {...props} className={clsx(props.className, tableCn)} />
);

export const THead: FC<HTMLAttributes<HTMLTableSectionElement>> = props => (
  <thead {...props} className={clsx(props.className, theadCn)} />
);

export const TBody: FC<HTMLAttributes<HTMLTableSectionElement>> = props => (
  <tbody {...props} className={clsx(props.className, tbodyCn)} />
);

export const Tr: FC<HTMLAttributes<HTMLTableRowElement>> = props => (
  <tr {...props} className={clsx(props.className, trCn)} />
);

export const Td: FC<HTMLAttributes<HTMLTableDataCellElement>> = props => (
  <td {...props} className={clsx(props.className, tdCn)} />
);

export const Th: FC<HTMLAttributes<HTMLTableHeaderCellElement>> = props => (
  <th {...props} className={clsx(props.className, thCn)} scope="col" />
);
