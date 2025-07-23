import type { Meta, StoryObj } from '@storybook/react';

import { ErrorScreen } from './ErrorScreen';

const meta = {
  component: ErrorScreen,
  parameters: {
    docs: {
      description: {
        component: 'A full-page error screen for displaying error codes, messages, and actions.',
      },
    },
  },
  tags: ['autodocs'],
  title: 'Shared/ErrorScreen',
} satisfies Meta<typeof ErrorScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default error screen with 404 code and default texts.
 */
export const Default: Story = {
  args: {
    buttonText: 'Go Home',
    code: 404,
    onButtonClick: () => alert('Go Home clicked!'),
    subtitle: 'Sorry, the page you are looking for does not exist.',
    title: 'Page Not Found',
  },
};

/**
 * Error screen with a custom error code and message.
 */
export const CustomError: Story = {
  args: {
    buttonText: 'Retry',
    code: '500',
    onButtonClick: () => alert('Retry clicked!'),
    subtitle: 'Something went wrong on our end. Please try again later.',
    title: 'Server Error',
  },
};

/**
 * Error screen without a button click handler.
 */
export const NoButtonHandler: Story = {
  args: {
    buttonText: 'Login',
    code: '401',
    onButtonClick: undefined,
    subtitle: 'You do not have permission to view this page.',
    title: 'Unauthorized',
  },
};
