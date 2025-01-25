// global modules
import type { FieldValues, Path } from 'react-hook-form';
import { type MouseEventHandler, useCallback, useState } from 'react';

// common modules
import { Icon } from '~/components/icon';
import { IconButton } from '~/components/icon-button';

import {
  ReactFormTextControl,
  type ReactFormTextControlProps,
} from '~/components/form-controls/react-form-text-control';

export function ReactFormPasswordControl<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>(props: ReactFormTextControlProps<TFieldValues, TName>) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const type = passwordVisible ? 'text' : 'password';

  const toggleEyeIconClick: MouseEventHandler<HTMLButtonElement> = useCallback(event => {
    event.stopPropagation();
    event.preventDefault();
    setPasswordVisible(prevVisible => !prevVisible);
  }, []);

  const eyeButtonComponent = (
    <IconButton
      aria-label={passwordVisible ? 'Hide password' : 'Show password'}
      aria-live="assertive"
      onClick={toggleEyeIconClick}
      size="sm"
      tabIndex={-1}
      type="button"
      variant="text"
    >
      <Icon type={passwordVisible ? 'eye' : 'eyeClosed'} />
    </IconButton>
  );

  return (
    <ReactFormTextControl
      {...props}
      inputProps={{
        ...props.inputProps,
        placeholder: props.inputProps?.placeholder || '••••••••',
        type,
      }}
      inputSuffix={eyeButtonComponent}
    />
  );
}
