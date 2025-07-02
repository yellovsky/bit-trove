import type { FC, ReactNode } from 'react';

import { Paper } from '@repo/ui/components/Paper';
import { Heading } from '@repo/ui/components/Typography';

interface AuthFormProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const AuthForm: FC<AuthFormProps> = ({ title, description, children, footer }) => (
  <Paper className="min-w-80">
    <Heading className="mt-4 mb-4 text-center" order={2}>
      {title}
    </Heading>

    {description && <div className="mb-4 text-center text-muted-foreground text-sm">{description}</div>}

    <div className="mt-4">{children}</div>

    {footer && <div className="mt-4 text-center">{footer}</div>}
  </Paper>
);
