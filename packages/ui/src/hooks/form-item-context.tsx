import { createContext, type FC, type PropsWithChildren, useContext } from 'react';

type FormItemContextValue = {
  id: string;
  formDescriptionId: string;
  formItemId: string;
  formMessageId: string;
};

const formItemContext = createContext<FormItemContextValue | null>(null);
export const useFormItemContext = () => useContext(formItemContext);

export const FormItemProvider: FC<PropsWithChildren<{ id: string }>> = ({ id, children }) => (
  <formItemContext.Provider
    value={{
      formDescriptionId: `${id}-form-item-description`,
      formItemId: `${id}-form-item`,
      formMessageId: `${id}-form-item-message`,
      id,
    }}
  >
    {children}
  </formItemContext.Provider>
);
