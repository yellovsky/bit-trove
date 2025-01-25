// global modules
import { createContext, type FC, type HTMLAttributes, useContext, useId, useMemo } from 'react';

interface FormControlContext {
  controlID?: string;
}
const formControlContext = createContext<FormControlContext>({});

export const useControlID = () => useContext(formControlContext).controlID;

interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  className?: string;
}

export const FormControl: FC<FormControlProps> = props => {
  const { children, className, id, ...rest } = props;
  const controlID = useId();
  const value = useMemo(() => ({ controlID: id || controlID }), [id, controlID]);

  return (
    <formControlContext.Provider value={value}>
      <div className={className} {...rest}>
        {children}
      </div>
    </formControlContext.Provider>
  );
};
