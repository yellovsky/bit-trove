import { EyeIcon, EyeOffIcon } from 'lucide-react';
import type { ComponentProps, FC } from 'react';
import { useState } from 'react';

import { TextInput } from '@repo/ui/components/TextInput';
import { cn } from '@repo/ui/lib/utils';

export interface PasswordInputProps extends Omit<ComponentProps<typeof TextInput>, 'type'> {}

export const PasswordInput: FC<PasswordInputProps> = ({ className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextInput
      className={cn(className)}
      rightElement={
        <button
          className="flex items-center justify-center text-muted-foreground hover:text-foreground"
          onClick={togglePasswordVisibility}
          type="button"
        >
          {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
        </button>
      }
      type={showPassword ? 'text' : 'password'}
      {...props}
    />
  );
};
