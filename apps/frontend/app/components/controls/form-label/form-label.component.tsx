// global modules
import clsx from 'clsx';
import type { FC, LabelHTMLAttributes } from 'react';

// common modules
import { useControlID } from '~/components/controls/control';

// local modules
import { label as labelCn, required as requiredCn } from './form-label.module.scss';

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel: FC<FormLabelProps> = props => {
  const { required, className, htmlFor, ...rest } = props;
  const controlID = useControlID();

  return (
    <label
      {...rest}
      className={clsx(labelCn, required && requiredCn, className)}
      htmlFor={htmlFor || controlID}
    />
  );
};
