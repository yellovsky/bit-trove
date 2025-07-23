import { EyeIcon, EyeOffIcon } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { IconButton } from '@repo/ui/components/IconButton';
import * as TextInput from '@repo/ui/components/TextInput';
import { cn } from '@repo/ui/lib/utils';

export interface PasswordInputProps extends Omit<TextInput.TextInputProps, 'type'> {}

export const PasswordInput: FC<PasswordInputProps> = ({ className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <TextInput.Root className={cn(className)} type={showPassword ? 'text' : 'password'} {...props}>
      <TextInput.EndSection>
        <IconButton onClick={togglePasswordVisibility} size="sm" variant="ghost">
          {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
        </IconButton>
      </TextInput.EndSection>
    </TextInput.Root>
  );
};
