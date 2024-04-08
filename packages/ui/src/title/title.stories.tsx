// global modules
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { Title } from './title.component';
import { TitlePending } from './title.pending';

const meta: Meta<typeof Title> = {
  component: Title,
  title: 'Title',

  parameters: { layout: 'centered' },
  tags: ['autodocs'],

  render: ({ as, ...rest }) => (
    <>
      <Title {...rest} as="h1" style={{ marginBottom: '2rem' }}>
        H1: {rest.children}
      </Title>
      <Title {...rest} as="h2" style={{ marginBottom: '2rem' }}>
        H2: {rest.children}
      </Title>
      <Title {...rest} as="h3" style={{ marginBottom: '2rem' }}>
        H3: {rest.children}
      </Title>
      <Title {...rest} as="h4" style={{ marginBottom: '2rem' }}>
        H4: {rest.children}
      </Title>
      <Title {...rest} as="h5">
        H5: {rest.children}
      </Title>
    </>
  ),

  argTypes: {
    as: {
      control: false,
      description: 'DOM node element name',

      table: {
        category: 'Component props',
        type: { summary: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'div'" },
      },
      type: { name: 'other', required: true, value: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'div'" },
    },
    children: {
      control: { type: 'text' },
      description: 'Title content',
      table: { category: 'Component props', type: { summary: 'string' } },
      type: { name: 'other', value: 'ReactNode' },
    },
    styledAs: {
      control: false,
      description:
        'Component style as. This prop allows to render title styled as title for another element',
      table: {
        category: 'Component props',
        type: { summary: "'h1' | 'h2' | 'h3' | 'h4' | 'h5'" },
      },
      type: { name: 'other', value: "'h1' | 'h2' | 'h3' | 'h4' | 'h5'" },
    },
  },

  args: {
    as: 'h1',
    children: faker.lorem.sentence(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// TODO: typings?
export const Playground: Story = { args: {} as never };

export const Pending: Story = {
  args: {} as never,

  // sorry =(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: ({ as, ...rest }: any) => (
    <div style={{ width: '30rem' }}>
      <TitlePending {...rest} style={{ marginBottom: '2rem' }} styledAs="h1" />
      <TitlePending {...rest} style={{ marginBottom: '2rem' }} styledAs="h2" />
      <TitlePending {...rest} style={{ marginBottom: '2rem' }} styledAs="h3" />
      <TitlePending {...rest} style={{ marginBottom: '2rem' }} styledAs="h4" />
      <TitlePending {...rest} styledAs="h5" />
    </div>
  ),
};
