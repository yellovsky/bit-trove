import type { Meta, StoryObj } from '@storybook/react';

import { type CalloutType, Content, Root, Title } from './Callout';

const meta: Meta<typeof Root> = {
  component: Root,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  title: 'Components/Callout',
};

export default meta;
type Story = StoryObj<typeof meta>;

const calloutTypes: CalloutType[] = ['info', 'question', 'warning', 'danger', 'code', 'success', 'recommendation'];

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4">
      {calloutTypes.map((type) => (
        <Root data-callout-type={type} key={type}>
          <Title type={type}>{`${type.charAt(0).toUpperCase() + type.slice(1)} Callout`}</Title>
          <Content>
            <p>
              This is a {type} callout with some example content. It can contain any type of content including
              paragraphs, lists, and other elements.
            </p>
          </Content>
        </Root>
      ))}
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <Root data-callout-type="info">
      <Title type="info">Information</Title>
      <Content>
        <div>
          <p>This is an informational callout that provides useful details to the reader.</p>
          <p>You can include multiple paragraphs and other content types.</p>
        </div>
      </Content>
    </Root>
  ),
};

export const Question: Story = {
  render: () => (
    <Root data-callout-type="question">
      <Title type="question">Frequently Asked Question</Title>
      <Content>
        <div>
          <p>
            <strong>Q: How do I use this feature?</strong>
          </p>
          <p>
            A: Simply follow the steps outlined in the documentation and you'll be able to use this feature effectively.
          </p>
        </div>
      </Content>
    </Root>
  ),
};

export const Warning: Story = {
  render: () => (
    <Root data-callout-type="warning">
      <Title type="warning">Important Warning</Title>
      <Content>
        <div>
          <p>⚠️ Please be careful when using this feature. Make sure to backup your data before proceeding.</p>
          <p>This action cannot be undone once completed.</p>
        </div>
      </Content>
    </Root>
  ),
};

export const Danger: Story = {
  render: () => (
    <Root data-callout-type="danger">
      <Title type="danger">Critical Error</Title>
      <Content>
        <div>
          <p>🚨 This is a critical error that requires immediate attention.</p>
          <p>Please contact support if you encounter this issue.</p>
        </div>
      </Content>
    </Root>
  ),
};

export const Code: Story = {
  render: () => (
    <Root data-callout-type="code">
      <Title type="code">Code Example</Title>
      <Content>
        <div>
          <p>Here's an example of how to use the API:</p>
          <pre className="rounded bg-gray-100 p-2 text-sm">
            {`const response = await fetch('/api/data');
const data = await response.json();`}
          </pre>
        </div>
      </Content>
    </Root>
  ),
};

export const Success: Story = {
  render: () => (
    <Root data-callout-type="success">
      <Title type="success">Operation Completed</Title>
      <Content>
        <div>
          <p>✅ Your changes have been saved successfully!</p>
          <p>The operation completed without any errors.</p>
        </div>
      </Content>
    </Root>
  ),
};

export const Recommendation: Story = {
  render: () => (
    <Root data-callout-type="recommendation">
      <Title type="recommendation">Best Practice</Title>
      <Content>
        <div>
          <p>💡 We recommend using this approach for better performance and maintainability.</p>
          <p>This pattern has been tested and proven to work well in production environments.</p>
        </div>
      </Content>
    </Root>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <Root data-callout-type="info">
      <Content>
        <p>This callout doesn't have a title, just the icon and content.</p>
      </Content>
    </Root>
  ),
};

export const WithComplexContent: Story = {
  render: () => (
    <Root data-callout-type="warning">
      <Title type="warning">Complex Content Example</Title>
      <Content>
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
      </Content>
    </Root>
  ),
};
