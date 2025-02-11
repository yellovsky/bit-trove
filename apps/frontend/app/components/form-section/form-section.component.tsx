// global modules
import clsx from 'clsx';

import {
  type ComponentProps,
  type FC,
  forwardRef,
  type HTMLAttributes,
  type MouseEventHandler,
  type PropsWithChildren,
} from 'react';

// common modules
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { IconButton } from '~/components/icon-button';

// local modules
import {
  actions as actionsCn,
  buttons as buttonsCn,
  content as contentCn,
  dragIcon as dragIconCn,
  formSection as formSectionCn,
  header as headerCn,
  wrapper as wrapperCn,
} from './form-section.module.scss';

export const FormSectionDrag: FC<HTMLAttributes<HTMLDivElement>> = props => (
  <div>
    <div {...props} className={dragIconCn}>
      <Icon type="drag" />
    </div>
  </div>
);

export const FormSectionHeader: FC<HTMLAttributes<HTMLDivElement>> = props => (
  <div {...props} className={clsx(props.className, headerCn)} />
);

interface FormSectionTitleProps
  extends Omit<ComponentProps<typeof Heading>, 'as' | 'size'>,
    Partial<Pick<ComponentProps<typeof Heading>, 'as' | 'size'>> {}

export const FormSectionTitle: FC<FormSectionTitleProps> = props => (
  <Heading {...props} as={props.as || 'h4'} size={props.size || 'md'} />
);

interface FormSectionActionsProps {
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onEdit?: MouseEventHandler<HTMLButtonElement>;
}

export const FormSectionActions: FC<FormSectionActionsProps> = props => (
  <div className={actionsCn}>
    {props.onEdit && (
      <IconButton onClick={props.onEdit} size="xs" type="button" variant="soft">
        <Icon type="edit" />
      </IconButton>
    )}

    {props.onClose && (
      <IconButton onClick={props.onClose} size="xs" type="button" variant="soft">
        <Icon type="cross" />
      </IconButton>
    )}
  </div>
);

export const FormSectionButtons: FC<PropsWithChildren> = ({ children }) => (
  <div className={buttonsCn}>{children}</div>
);

export const FormSectionContent: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => (
  <div {...rest} className={clsx(className, contentCn)} />
);

export const FormSection = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => (
    <div {...props} className={formSectionCn} ref={ref}>
      <div className={wrapperCn}>{props.children}</div>
    </div>
  ),
);
