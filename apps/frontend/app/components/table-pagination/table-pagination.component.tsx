// global modules
import * as R from 'ramda';
import clsx from 'clsx';
import type { FC } from 'react';

// local modules
import {
  first as firstCn,
  item as itemCn,
  last as lastCn,
  tablePagination as tablePaginationCn,
} from './table-pagination.module.scss';

const usePageIndexes = (currentIndex: number, pagesCount: number): Array<number | null> => {
  if (pagesCount <= 6) return R.range(0, pagesCount);
  if (currentIndex < 3) {
    return [...R.range(0, 3), null, pagesCount - 1];
  }
  if (currentIndex > pagesCount - 4) {
    return [0, null, ...R.range(pagesCount - 3, pagesCount)];
  }
  return [0, null, ...R.range(currentIndex - 1, currentIndex + 2), null, pagesCount - 1];
};

interface TablePaginationProps {
  currentIndex: number;
  pagesCount: number;
  canNextPage: boolean;
  canPrevPage: boolean;

  onPrevPage(): void;
  onNextPage(): void;
  onPageSelect(index: number): void;
}

export const TablePagination: FC<TablePaginationProps> = props => {
  const idx = usePageIndexes(props.currentIndex, props.pagesCount);

  return (
    <ul className={tablePaginationCn}>
      <li>
        <button className={clsx(itemCn, firstCn)} onClick={props.onPrevPage}>
          Previous
        </button>
      </li>

      {idx.map((index, key) => (
        <li key={key}>
          {index === null ? (
            <span className={itemCn}>...</span>
          ) : (
            <button className={itemCn} onClick={() => props.onPageSelect(index)}>
              {index === props.currentIndex ? (
                <b>{JSON.stringify(index + 1)}</b>
              ) : (
                <>{JSON.stringify(index + 1)}</>
              )}
            </button>
          )}
        </li>
      ))}

      <li>
        <button className={clsx(itemCn, lastCn)} onClick={props.onNextPage}>
          Next
        </button>
      </li>
    </ul>
  );
};
