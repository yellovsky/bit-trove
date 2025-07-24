import type { FC } from 'react';

import * as PaginationPromitives from '@repo/ui/components/Pagination';

/* -------------------------------------------------------------------------------------------------
 * Pagination
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Pagination';

type PaginationProps = PaginationPromitives.PaginationProps & {
  pagesCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ pagesCount, currentPage, onPageChange, ...rest }) => {
  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 7;
    if (pagesCount <= maxVisible) {
      for (let i = 1; i <= pagesCount; i++) pages.push(i);
      return pages;
    }
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('ellipsis');
      pages.push(pagesCount);
    } else if (currentPage >= pagesCount - 3) {
      pages.push(1);
      pages.push('ellipsis');
      for (let i = pagesCount - 4; i <= pagesCount; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('ellipsis');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push('ellipsis');
      pages.push(pagesCount);
    }
    return pages;
  };

  return pagesCount < 2 ? null : (
    <PaginationPromitives.Root {...rest}>
      <PaginationPromitives.Content>
        <PaginationPromitives.Item>
          <PaginationPromitives.Previous
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          />
        </PaginationPromitives.Item>
        {getVisiblePages().map((page, idx) => (
          <PaginationPromitives.Item key={page === 'ellipsis' ? `ellipsis-${idx}` : page}>
            {page === 'ellipsis' ? (
              <PaginationPromitives.Ellipsis />
            ) : (
              <PaginationPromitives.Link
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  if (page !== currentPage) onPageChange(page as number);
                }}
              >
                {page}
              </PaginationPromitives.Link>
            )}
          </PaginationPromitives.Item>
        ))}
        <PaginationPromitives.Item>
          <PaginationPromitives.Next
            aria-disabled={currentPage === pagesCount}
            className={currentPage === pagesCount ? 'pointer-events-none opacity-50' : ''}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < pagesCount) onPageChange(currentPage + 1);
            }}
          />
        </PaginationPromitives.Item>
      </PaginationPromitives.Content>
    </PaginationPromitives.Root>
  );
};

Pagination.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { Pagination };
export type { PaginationProps };
