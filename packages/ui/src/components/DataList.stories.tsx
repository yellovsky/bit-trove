import type { Meta, StoryObj } from '@storybook/react';

import { DataList, DataListItem, DataListLabel, DataListValue } from './DataList';
import DataListMdx from './DataList.mdx';

const meta = {
  component: DataList,
  parameters: {
    docs: {
      page: DataListMdx,
    },
  },
  tags: ['autodocs'],
  title: 'UI/DataList',
} satisfies Meta<typeof DataList>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic DataList usage with two items.
 */
export const Basic: Story = {
  render: () => (
    <DataList>
      <DataListItem>
        <DataListLabel>Name</DataListLabel>
        <DataListValue>Jane Doe</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Email</DataListLabel>
        <DataListValue>jane@example.com</DataListValue>
      </DataListItem>
    </DataList>
  ),
};

/**
 * DataList with custom className for styling.
 */
export const CustomClass: Story = {
  render: () => (
    <DataList className="rounded bg-gray-2 p-4">
      <DataListItem>
        <DataListLabel>Role</DataListLabel>
        <DataListValue>Admin</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Status</DataListLabel>
        <DataListValue>Active</DataListValue>
      </DataListItem>
    </DataList>
  ),
};

/**
 * DataList with long values and wrapping.
 */
export const Wrapping: Story = {
  render: () => (
    <DataList>
      <DataListItem>
        <DataListLabel>Description</DataListLabel>
        <DataListValue>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur,
          nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.
        </DataListValue>
      </DataListItem>
    </DataList>
  ),
};
