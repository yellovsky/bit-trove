// global modules
import clsx from 'clsx';

import {
  forwardRef,
  type InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

// common modules
import { useControlID } from '~/components/controls/control';

// local modules
import {
  holder as holderCn,
  inputControl as inputControlCn,
  inputOutline as inputOutlineCn,
  invalid as invalidCn,
  success as successCn,
  warning as warningCn,
} from './textarea.module.scss';

export interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  success?: boolean;
  warning?: boolean;
  isFocused?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, outerRef) => {
  const { invalid, success, warning, className, id: propsID, isFocused, ...rest } = props;

  const innerRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(outerRef, () => innerRef.current!, []);

  const controlID = useControlID();
  const id = propsID || controlID;

  useEffect(() => {
    if (isFocused) innerRef.current?.focus();
  }, [isFocused]);

  return (
    <div className={clsx(className, inputControlCn, holderCn)}>
      <textarea
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
    </div>
  );
});
