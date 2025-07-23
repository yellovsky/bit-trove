import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * DataList
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'DataList';

type DataListProps = ComponentProps<'dl'>;

const DataList: FC<DataListProps> = ({ className, ...rest }) => (
  <dl className={cn('grid-[auto_1fr] wrap-anywhere grid gap-4 text-sm', className)} {...rest} />
);

DataList.displayName = NAME;

/* -------------------------------------------------------------------------------------------------
 * DataListItem
 * -----------------------------------------------------------------------------------------------*/
const NAME_DATA_LIST_ITEM = 'DataListItem';

type DataListItemProps = ComponentProps<'div'>;

const DataListItem: FC<DataListItemProps> = ({ className, ...rest }) => (
  <div className={cn('col-[span_3] grid grid-cols-subgrid gap-inherit', className)} {...rest} />
);

DataListItem.displayName = NAME_DATA_LIST_ITEM;

/* -------------------------------------------------------------------------------------------------
 * DataListLabel
 * -----------------------------------------------------------------------------------------------*/
const NAME_DATA_LIST_LABEL = 'DataListLabel';

type DataListLabelProps = ComponentProps<'dt'>;

const DataListLabel: FC<DataListLabelProps> = ({ className, ...rest }) => (
  <dt className={cn('fle min-w-20 text-gray-a11', className)} {...rest} />
);

DataListLabel.displayName = NAME_DATA_LIST_LABEL;

/* -------------------------------------------------------------------------------------------------
 * DataListValue
 * -----------------------------------------------------------------------------------------------*/
const NAME_DATA_LIST_VALUE = 'DataListValue';

type DataListValueProps = ComponentProps<'dt'>;

const DataListValue: FC<DataListValueProps> = ({ className, ...rest }) => (
  <dt className={cn('-mb-[0.25em] m-0 flex min-w-0', className)} {...rest} />
);

DataListValue.displayName = NAME_DATA_LIST_VALUE;

/* -----------------------------------------------------------------------------------------------*/

const Root = DataList;
const Item = DataListItem;
const Label = DataListLabel;
const Value = DataListValue;

export {
  Root,
  Item,
  Label,
  Value,
  //
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
};

export type { DataListProps, DataListItemProps, DataListLabelProps, DataListValueProps };
