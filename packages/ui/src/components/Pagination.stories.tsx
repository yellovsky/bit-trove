import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './Pagination';
import PaginationMdx from './Pagination.mdx';

interface PaginationArgs {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  showEllipsis?: boolean;
}

const meta = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'The current active page number',
      table: {
        category: 'State',
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },
    maxVisiblePages: {
      control: 'number',
      description: 'Maximum number of page links to show',
      table: {
        category: 'Display',
        defaultValue: { summary: '5' },
        type: { summary: 'number' },
      },
    },
    showEllipsis: {
      control: 'boolean',
      description: 'Whether to show ellipsis for large page ranges',
      table: {
        category: 'Display',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    totalPages: {
      control: 'number',
      description: 'The total number of pages',
      table: {
        category: 'State',
        defaultValue: { summary: '10' },
        type: { summary: 'number' },
      },
    },
  },
  parameters: {
    docs: {
      page: PaginationMdx,
    },
    layout: 'centered',
  },
  render: (_args: PaginationArgs) => <div />,
  tags: ['autodocs'],
  title: 'UI/Pagination',
} satisfies Meta<PaginationArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic pagination with previous/next navigation and page numbers.
 */
export const Default: Story = {
  render: (args: PaginationArgs) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.max(1, currentPage - 1));
              }}
            />
          </PaginationItem>
          {Array.from({ length: Math.min(args.totalPages, 5) }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.min(args.totalPages, currentPage + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

/**
 * Pagination with ellipsis for large page ranges.
 */
export const WithEllipsis: Story = {
  args: {
    currentPage: 5,
    showEllipsis: true,
    totalPages: 20,
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with ellipsis for large page ranges, showing smart truncation of page numbers.',
      },
    },
  },
  render: (args: PaginationArgs) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);
    const totalPages = args.totalPages;

    const getVisiblePages = () => {
      const pages = [];
      const maxVisible = 7;

      if (totalPages <= maxVisible) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      }

      return pages;
    };

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.max(1, currentPage - 1));
              }}
            />
          </PaginationItem>
          {getVisiblePages().map((page, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: it's a story
            <PaginationItem key={index}>
              {page === 'ellipsis' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page as number);
                  }}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.min(totalPages, currentPage + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

/**
 * Simple pagination with only previous/next buttons.
 */
export const Simple: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple pagination with only previous/next navigation and current page indicator.',
      },
    },
  },
  render: (args: PaginationArgs) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.max(1, currentPage - 1));
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              Page {currentPage} of {args.totalPages}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.min(args.totalPages, currentPage + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

/**
 * Pagination with custom page range display.
 */
export const CustomRange: Story = {
  args: {
    currentPage: 5,
    maxVisiblePages: 3,
    totalPages: 15,
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with custom page range display, showing a limited number of pages around the current page.',
      },
    },
  },
  render: (args: PaginationArgs) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);
    const maxVisible = args.maxVisiblePages ?? 5;

    const getVisiblePages = () => {
      const pages = [];
      const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      const end = Math.min(args.totalPages, start + maxVisible - 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    };

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.max(1, currentPage - 1));
              }}
            />
          </PaginationItem>
          {getVisiblePages().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.min(args.totalPages, currentPage + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

/**
 * Pagination with disabled states for edge cases.
 */
export const WithDisabledStates: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with disabled states for previous/next buttons when at the first or last page.',
      },
    },
  },
  render: (args: PaginationArgs) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.max(1, currentPage - 1));
              }}
            />
          </PaginationItem>
          {Array.from({ length: args.totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className={currentPage === args.totalPages ? 'pointer-events-none opacity-50' : ''}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.min(args.totalPages, currentPage + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

/**
 * Large pagination with many pages and ellipsis.
 */
export const LargePagination: Story = {
  args: {
    currentPage: 50,
    showEllipsis: true,
    totalPages: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'Large pagination with many pages, demonstrating smart ellipsis placement for optimal user experience.',
      },
    },
  },
  render: (args: PaginationArgs) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);
    const totalPages = args.totalPages;

    const getVisiblePages = () => {
      const pages = [];

      if (currentPage <= 5) {
        for (let i = 1; i <= 7; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 4) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 6; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      }

      return pages;
    };

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.max(1, currentPage - 1));
              }}
            />
          </PaginationItem>
          {getVisiblePages().map((page, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: it's a story
            <PaginationItem key={index}>
              {page === 'ellipsis' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page as number);
                  }}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.min(totalPages, currentPage + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

/**
 * Compact pagination for mobile or space-constrained layouts.
 */
export const Compact: Story = {
  args: {
    currentPage: 3,
    totalPages: 8,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact pagination with reduced spacing for mobile or space-constrained layouts.',
      },
    },
  },
  render: (args: PaginationArgs) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <Pagination>
        <PaginationContent className="gap-0.5">
          <PaginationItem>
            <PaginationPrevious
              className="px-2"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.max(1, currentPage - 1));
              }}
            />
          </PaginationItem>
          {Array.from({ length: Math.min(args.totalPages, 3) }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className="px-2"
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className="px-2"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.min(args.totalPages, currentPage + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

/**
 * Multiple pagination examples demonstrating different configurations.
 */
export const MultipleExamples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple pagination examples demonstrating different configurations and use cases.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-2 font-medium text-sm">Basic Pagination</h3>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div>
        <h3 className="mb-2 font-medium text-sm">With Ellipsis</h3>
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
              <PaginationLink href="#" isActive>
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div>
        <h3 className="mb-2 font-medium text-sm">Simple Navigation</h3>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                Page 3 of 10
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  ),
};

/**
 * Interactive test story for accessibility and functionality testing.
 */
export const InteractiveTest: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            enabled: true,
            id: 'color-contrast',
          },
        ],
      },
    },
    chromatic: { disableSnapshot: false },
    docs: {
      description: {
        story:
          'Interactive test story for accessibility and functionality testing. Use Storybook interactions to test keyboard navigation and focus states.',
      },
    },
  },
  render: (args: PaginationArgs) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.max(1, currentPage - 1));
              }}
            />
          </PaginationItem>
          {Array.from({ length: Math.min(args.totalPages, 5) }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.min(args.totalPages, currentPage + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};
