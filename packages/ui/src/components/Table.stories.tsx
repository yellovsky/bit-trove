import type { Meta, StoryObj } from '@storybook/react';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { IconButton } from './IconButton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './Table';
import tableMdx from './Table.mdx';

const meta: Meta<typeof Table> = {
  argTypes: {},
  component: Table,
  parameters: {
    docs: {
      page: tableMdx,
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Table',
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  {
    email: 'john.doe@example.com',
    id: '1',
    lastLogin: '2024-01-15',
    name: 'John Doe',
    role: 'Admin',
    status: 'Active',
  },
  {
    email: 'jane.smith@example.com',
    id: '2',
    lastLogin: '2024-01-14',
    name: 'Jane Smith',
    role: 'User',
    status: 'Active',
  },
  {
    email: 'bob.johnson@example.com',
    id: '3',
    lastLogin: '2024-01-10',
    name: 'Bob Johnson',
    role: 'Editor',
    status: 'Inactive',
  },
  {
    email: 'alice.brown@example.com',
    id: '4',
    lastLogin: '2024-01-13',
    name: 'Alice Brown',
    role: 'User',
    status: 'Active',
  },
  {
    email: 'charlie.wilson@example.com',
    id: '5',
    lastLogin: '2024-01-12',
    name: 'Charlie Wilson',
    role: 'Admin',
    status: 'Active',
  },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV004</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV005</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$550.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV006</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$200.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const UsersTable: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of users in the system.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Login</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${
                  user.status === 'Active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}
              >
                {user.status}
              </span>
            </TableCell>
            <TableCell>{user.lastLogin}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const SortableTable: Story = {
  render: () => {
    const [sortConfig, setSortConfig] = useState<{
      key: keyof (typeof sampleData)[0] | null;
      direction: 'asc' | 'desc';
    }>({ direction: 'asc', key: null });

    const sortedData = [...sampleData].sort((a, b) => {
      if (!sortConfig.key) return 0;

      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    const handleSort = (key: keyof (typeof sampleData)[0]) => {
      setSortConfig((prev) => ({
        direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        key,
      }));
    };

    return (
      <Table>
        <TableCaption>A sortable table of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button className="h-auto p-0 font-medium" onClick={() => handleSort('name')} variant="ghost">
                Name
                <ArrowUpDown className="ml-2 size-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button className="h-auto p-0 font-medium" onClick={() => handleSort('email')} variant="ghost">
                Email
                <ArrowUpDown className="ml-2 size-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button className="h-auto p-0 font-medium" onClick={() => handleSort('role')} variant="ghost">
                Role
                <ArrowUpDown className="ml-2 size-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button className="h-auto p-0 font-medium" onClick={() => handleSort('status')} variant="ghost">
                Status
                <ArrowUpDown className="ml-2 size-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button className="h-auto p-0 font-medium" onClick={() => handleSort('lastLogin')} variant="ghost">
                Last Login
                <ArrowUpDown className="ml-2 size-4" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}
                >
                  {user.status}
                </span>
              </TableCell>
              <TableCell>{user.lastLogin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const SelectableTable: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        setSelectedRows(new Set(sampleData.map((user) => user.id)));
      } else {
        setSelectedRows(new Set());
      }
    };

    const handleSelectRow = (id: string, checked: boolean) => {
      const newSelected = new Set(selectedRows);
      if (checked) {
        newSelected.add(id);
      } else {
        newSelected.delete(id);
      }
      setSelectedRows(newSelected);
    };

    const isAllSelected = selectedRows.size === sampleData.length;
    const isIndeterminate = selectedRows.size > 0 && selectedRows.size < sampleData.length;

    return (
      <Table>
        <TableCaption>A table with selectable rows.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                aria-label="Select all"
                checked={isIndeterminate ? 'indeterminate' : isAllSelected}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox
                  aria-label={`Select ${user.name}`}
                  checked={selectedRows.has(user.id)}
                  onCheckedChange={(checked) => handleSelectRow(user.id, checked as boolean)}
                />
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}
                >
                  {user.status}
                </span>
              </TableCell>
              <TableCell>
                <IconButton aria-label="More options" variant="ghost">
                  <MoreHorizontal className="size-4" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const ExpandableTable: Story = {
  render: () => {
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    const toggleRow = (id: string) => {
      const newExpanded = new Set(expandedRows);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      setExpandedRows(newExpanded);
    };

    return (
      <Table>
        <TableCaption>An expandable table with additional details.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12" />
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((user) => (
            <>
              <TableRow key={user.id}>
                <TableCell>
                  <IconButton
                    aria-label={expandedRows.has(user.id) ? 'Collapse row' : 'Expand row'}
                    onClick={() => toggleRow(user.id)}
                    variant="ghost"
                  >
                    <ChevronDown
                      className={`size-4 transition-transform ${expandedRows.has(user.id) ? 'rotate-180' : ''}`}
                    />
                  </IconButton>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
              {expandedRows.has(user.id) && (
                <TableRow key={`${user.id}-expanded`}>
                  <TableCell className="bg-muted/50" colSpan={5}>
                    <div className="p-4">
                      <h4 className="mb-2 font-medium">Additional Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">User ID:</span> {user.id}
                        </div>
                        <div>
                          <span className="font-medium">Last Login:</span> {user.lastLogin}
                        </div>
                        <div>
                          <span className="font-medium">Account Created:</span> 2024-01-01
                        </div>
                        <div>
                          <span className="font-medium">Login Count:</span> 42
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const CompactTable: Story = {
  render: () => (
    <Table>
      <TableCaption>A compact table with minimal spacing.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="py-1">Name</TableHead>
          <TableHead className="py-1">Email</TableHead>
          <TableHead className="py-1">Role</TableHead>
          <TableHead className="py-1">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="py-1 font-medium">{user.name}</TableCell>
            <TableCell className="py-1">{user.email}</TableCell>
            <TableCell className="py-1">{user.role}</TableCell>
            <TableCell className="py-1">
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium text-xs ${
                  user.status === 'Active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}
              >
                {user.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
