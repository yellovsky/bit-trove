import type { Meta, StoryObj } from '@storybook/react';

import * as Callout from './Callout';

const meta: Meta<typeof Callout.Root> = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['soft', 'surface', 'outline'],
    },
  },
  component: Callout.Root,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  title: 'Components/Callout',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTypes: Story = {
  render: ({ variant }) => (
    <div className="space-y-4">
      {Callout.CALLOUT_TYPES.map((type) => (
        <Callout.Root data-callout-type={type} key={type} variant={variant}>
          <Callout.Title>{`${type.charAt(0).toUpperCase() + type.slice(1)} Callout`}</Callout.Title>
          <Callout.Content>
            <p>
              This is a {type} callout with some example content. It can contain any type of content including
              paragraphs, lists, and other elements.
            </p>
          </Callout.Content>
        </Callout.Root>
      ))}
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <Callout.Root data-callout-type="info">
      <Callout.Title>Information</Callout.Title>
      <Callout.Content>
        <div>
          <p>This is an informational callout that provides useful details to the reader.</p>
          <p>You can include multiple paragraphs and other content types.</p>
        </div>
      </Callout.Content>
    </Callout.Root>
  ),
};

export const Question: Story = {
  render: () => (
    <Callout.Root data-callout-type="question">
      <Callout.Title>Frequently Asked Question</Callout.Title>
      <Callout.Content>
        <div>
          <p>
            <strong>Q: How do I use this feature?</strong>
          </p>
          <p>
            A: Simply follow the steps outlined in the documentation and you'll be able to use this feature effectively.
          </p>
        </div>
      </Callout.Content>
    </Callout.Root>
  ),
};

export const Warning: Story = {
  render: () => (
    <Callout.Root data-callout-type="warning">
      <Callout.Title>Important Warning</Callout.Title>
      <Callout.Content>
        <div>
          <p>⚠️ Please be careful when using this feature. Make sure to backup your data before proceeding.</p>
          <p>This action cannot be undone once completed.</p>
        </div>
      </Callout.Content>
    </Callout.Root>
  ),
};

export const Danger: Story = {
  render: () => (
    <Callout.Root data-callout-type="danger">
      <Callout.Title>Critical Error</Callout.Title>
      <Callout.Content>
        <div>
          <p>🚨 This is a critical error that requires immediate attention.</p>
          <p>Please contact support if you encounter this issue.</p>
        </div>
      </Callout.Content>
    </Callout.Root>
  ),
};

export const Code: Story = {
  render: () => (
    <Callout.Root data-callout-type="code">
      <Callout.Title>Code Example</Callout.Title>
      <Callout.Content>
        <div>
          <p>Here's an example of how to use the API:</p>
          <pre className="rounded bg-gray-100 p-2 text-sm">
            {`const response = await fetch('/api/data');
const data = await response.json();`}
          </pre>
        </div>
      </Callout.Content>
    </Callout.Root>
  ),
};

export const Success: Story = {
  render: () => (
    <Callout.Root data-callout-type="success">
      <Callout.Title>Operation Completed</Callout.Title>
      <Callout.Content>
        <div>
          <p>✅ Your changes have been saved successfully!</p>
          <p>The operation completed without any errors.</p>
        </div>
      </Callout.Content>
    </Callout.Root>
  ),
};

export const Recommendation: Story = {
  render: () => (
    <Callout.Root data-callout-type="recommendation">
      <Callout.Title>Best Practice</Callout.Title>
      <Callout.Content>
        <div>
          <p>💡 We recommend using this approach for better performance and maintainability.</p>
          <p>This pattern has been tested and proven to work well in production environments.</p>
        </div>
      </Callout.Content>
    </Callout.Root>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <Callout.Root data-callout-type="info">
      <Callout.Content>
        <p>This callout doesn't have a title, just the icon and content.</p>
      </Callout.Content>
    </Callout.Root>
  ),
};

export const WithComplexContent: Story = {
  render: () => (
    <Callout.Root data-callout-type="warning">
      <Callout.Title>Complex Content Example</Callout.Title>
      <Callout.Content>
        <div className="space-y-2">
          <p>This callout contains various types of content:</p>
          <ul className="ml-4 list-inside list-disc">
            <li>Bullet points</li>
            <li>Multiple items</li>
            <li>Nested content</li>
          </ul>
          <p>
            And even <strong>formatted text</strong> with <em>different styles</em>.
          </p>
        </div>
      </Callout.Content>
    </Callout.Root>
  ),
};
