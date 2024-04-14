// global modules
import type { ComponentProps } from 'react';
import { faker } from '@faker-js/faker';
import { Fragment } from 'react/jsx-runtime';
import { COLOR_SCHEMES, colorSchemeArgType } from '@bit-trove/ui/apply-color-scheme';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { Link, type LinkVariant } from './link.component';

const meta = {
  component: Link,
  title: 'UI/Link',

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Link text',
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
      type: { name: 'other', value: 'ReactNode' },
    },
    colorScheme: { ...colorSchemeArgType, defaultValue: 'primary' },
    to: {
      control: false,
      description: 'Link href',
      table: { category: 'Component props', type: { summary: 'To' } },
      type: { name: 'other', value: 'To' },
    },
    variant: {
      control: 'select',
      description: 'Link variant',
      options: ['plain', 'text', 'standalone'],
      table: { category: 'Component props', type: { summary: "'plain' | 'text' | 'standalone'" } },
      type: { name: 'other', value: "'plain' | 'text' | 'standalone'" },
    },
  },

  args: { children: faker.lorem.words(3), colorScheme: 'primary', to: '#', variant: 'standalone' },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderLinkSet = (variant: LinkVariant) => (props: ComponentProps<typeof Link>) => (
  <div
    style={{
      display: 'grid',
      gap: '1rem',
      gridTemplateColumns: 'min-content min-content',
      whiteSpace: 'nowrap',
    }}
  >
    {COLOR_SCHEMES.map((scheme) => (
      <Fragment key={scheme}>
        <div style={{ textTransform: 'capitalize' }}>{scheme}:</div>
        <div>
          <Link {...props} colorScheme={scheme} variant={variant} />
        </div>
      </Fragment>
    ))}
  </div>
);
export const TextLink: Story = { render: renderLinkSet('text') };
export const StandaloneLink: Story = { render: renderLinkSet('standalone') };
