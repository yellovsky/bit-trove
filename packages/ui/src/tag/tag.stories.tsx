// global modules
import type { ComponentProps } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { Icon } from '@bit-trove/ui/icon';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { Tag, TagLabel, TagLeftIcon, TagRightIcon, type TagVariant } from './tag.component';

const TAG_SIZES = ['lg', 'md', 'sm'] as const;
const TAG_SCHEMES = [
  'primary',
  'yellow',
  'gray',
  'red',
  'green',
  'orange',
  'black-alpha',
  'white-alpha',
] as const;

const meta = {
  component: Tag,
  title: 'UI/Tag',

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Button text',
      table: { category: 'Component props', type: { summary: 'ReactNode' } },
      type: { name: 'other', value: 'ReactNode' },
    },
    colorScheme: {
      control: 'select',
      defaultValue: 'md',
      description: 'Button color scheme',
      options: TAG_SCHEMES,
      table: {
        category: 'Component props',
        type: { summary: TAG_SCHEMES.map((scheme) => `"${scheme}"`).join(' | ') },
      },
      type: { name: 'other', value: TAG_SCHEMES.map((scheme) => `"${scheme}"`).join(' | ') },
    },
    size: {
      control: 'select',
      defaultValue: 'md',
      description: 'Button size',
      options: TAG_SIZES,
      table: {
        category: 'Component props',
        type: { summary: TAG_SIZES.map((size) => `"${size}"`).join(' | ') },
      },
      type: { name: 'other', value: TAG_SIZES.map((size) => `"${size}"`).join(' | ') },
    },
    variant: {
      control: 'select',
      description: 'Button variant',
      options: ['filled', 'outline'],
      table: { category: 'Component props', type: { summary: "'filled' | 'outline'" } },
      type: { name: 'other', value: "'filled' | 'outline'" },
    },
  },

  args: { children: 'Button', colorScheme: 'primary', size: 'md', variant: 'filled' },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const renderTagSet = (variant: TagVariant) => (props: ComponentProps<typeof Tag>) => (
  <div
    style={{
      alignItems: 'center',
      display: 'grid',
      gap: '1rem',
      gridTemplateColumns: `repeat(${TAG_SIZES.length + 1}, min-content)`,
    }}
  >
    {TAG_SCHEMES.map((colorScheme) => (
      <Fragment key={colorScheme}>
        <div style={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}>{colorScheme}:</div>
        {TAG_SIZES.map((size) => (
          <Tag {...props} colorScheme={colorScheme} key={size} size={size} variant={variant}>
            {variant === 'filled' && (
              <TagLeftIcon>
                <Icon type="tag" />
              </TagLeftIcon>
            )}

            <TagLabel>{props.children}</TagLabel>
            {variant === 'outline' && (
              <TagRightIcon>
                <Icon type="tag" />
              </TagRightIcon>
            )}
          </Tag>
        ))}
      </Fragment>
    ))}
  </div>
);

export const WithLeftIcon: Story = {
  render: (props) => (
    <Tag {...props}>
      <TagLeftIcon>
        <Icon type="clock" />
      </TagLeftIcon>
      <TagLabel>{props.children}</TagLabel>
    </Tag>
  ),
};

export const WithRightIcon: Story = {
  render: (props) => (
    <Tag {...props}>
      <TagLabel>{props.children}</TagLabel>
      <TagRightIcon>
        <Icon type="tag" />
      </TagRightIcon>
    </Tag>
  ),
};

export const Outline: Story = { render: renderTagSet('outline') };
export const Filled: Story = { render: renderTagSet('filled') };
