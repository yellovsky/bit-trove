import { Box, Paper, Stack, Text, Title } from '@mantine/core';
import type { FC, ReactNode } from 'react';

interface AuthFormProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const AuthForm: FC<AuthFormProps> = ({ title, description, children, footer }) => (
  <Paper p="xl" radius="md" withBorder>
    <Title mb="md" mt="md" order={2} ta="center">
      {title}
    </Title>

    {description && (
      <Text c="dimmed" mb="xl" size="sm" ta="center">
        {description}
      </Text>
    )}

    <Stack gap="md">{children}</Stack>

    {footer && (
      <Box mt="xl" ta="center">
        {footer}
      </Box>
    )}
  </Paper>
);
