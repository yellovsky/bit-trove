// global modules
import clsx from 'clsx';

import {
  type FC,
  forwardRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

// common modules
import { useControlID } from '~/components/controls/control';

// local modules
import {
  autofillBackdrop as autofillBackdropCn,
  holder as holderCn,
  inputControl as inputControlCn,
  inputOutline as inputOutlineCn,
  invalid as invalidCn,
  overlay as overlayCn,
  prefix as prefixCn,
  success as successCn,
  suffix as suffixCn,
  warning as warningCn,
} from './input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  success?: boolean;
  warning?: boolean;
  isFocused?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, outerRef) => {
  const { invalid, success, warning, className, id: propsID, isFocused, ...rest } = props;

  const innerRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(outerRef, () => innerRef.current!, []);

  const controlID = useControlID();
  const id = propsID || controlID;

  useEffect(() => {
    if (isFocused) innerRef.current?.focus();
  }, [isFocused]);

  return (
    <div className={clsx(className, holderCn)}>
      <input
        {...rest}
        aria-invalid={invalid ? true : undefined}
        className={clsx(
          inputOutlineCn,
          invalid && invalidCn,
          success && successCn,
          warning && warningCn,
        )}
        id={id}
        ref={innerRef}
      />
      <div className={autofillBackdropCn} />
    </div>
  );
});

interface InputPrefixProps extends HTMLAttributes<HTMLDivElement> {
  overlay?: boolean;
}

export const InputPrefix: FC<InputPrefixProps> = ({ children, className, overlay, ...rest }) => (
  <div className={clsx(prefixCn, className, overlay && overlayCn)} {...rest}>
    {children}
  </div>
);

interface InputSuffixProps extends HTMLAttributes<HTMLDivElement> {
  overlay?: boolean;
}

export const InputSuffix: FC<InputSuffixProps> = ({ children, className, overlay, ...rest }) => (
  <div className={clsx(suffixCn, className, overlay && overlayCn)} {...rest}>
    {children}
  </div>
);

interface InputControlProps extends HTMLAttributes<HTMLDivElement> {}

export const InputControl: FC<InputControlProps> = props => {
  const { children, className, ...rest } = props;

  return (
    <div className={clsx(inputControlCn, className)} {...rest}>
      {children}
    </div>
  );
};
