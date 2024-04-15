// global modules
import type { ApplyClassname } from '@repo/ui/apply-classname';
import clsx from 'clsx';

type SpacingValue =
  | '0.125rem'
  | '0.25rem'
  | '0.375rem'
  | '0.5rem'
  | '0.625rem'
  | '0.75rem'
  | '0.875rem'
  | '1rem'
  | '1.25rem'
  | '1.5rem'
  | '1.75rem'
  | '2rem'
  | '2.25rem'
  | '2.5rem'
  | '3rem'
  | '3.5rem'
  | '4rem';

type SpacingCnToken = 'mt' | 'mb' | 'pt' | 'pb';

const spacingTypeCnLookup: Record<SpacingCnToken, string> = {
  mb: 'sp-mb',
  mt: 'sp-mt',
  pb: 'sp-pb',
  pt: 'sp-pt',
};

const spacingCnLookup: Record<SpacingValue, string> = {
  '0.5rem': 'sp-0-5',
  '0.25rem': 'sp-0-25',
  '0.75rem': 'sp-0-75',
  '0.125rem': 'sp-0-125',
  '0.375rem': 'sp-0-375',
  '0.625rem': 'sp-0-625',
  '0.875rem': 'sp-0-875',
  '1.5rem': 'sp-1-5',
  '1.25rem': 'sp-1-25',
  '1.75rem': 'sp-0-75',
  '1rem': 'sp-1',
  '2.5rem': 'sp-2-5',
  '2.25rem': 'sp-2-25',
  '2rem': 'sp-2',
  '3.5rem': 'sp-3-5',
  '3rem': 'sp-3',
  '4rem': 'sp-4',
};

type SpacingType =
  | 'mb'
  | 'marginBottom'
  | 'mt'
  | 'marginTop'
  | 'pb'
  | 'paddingBottom'
  | 'pt'
  | 'paddingTop';

export interface SpacingProps extends Partial<Record<SpacingType, SpacingValue>> {}

const getLookupValue = (
  spacingCnToken: SpacingCnToken,
  need: SpacingValue | undefined
): string | undefined =>
  !need ? undefined : clsx(spacingTypeCnLookup[spacingCnToken], spacingCnLookup[need]);

const separateSpacingProps = <TProps extends SpacingProps>({
  mb,
  marginBottom,
  mt,
  marginTop,
  pb,
  paddingBottom,
  pt,
  paddingTop,
  ...rest
}: TProps): { spacingProps: SpacingProps; rest: Omit<TProps, SpacingType> } => ({
  rest,
  spacingProps: { marginBottom, marginTop, mb, mt, paddingBottom, paddingTop, pb, pt },
});

export const applySpacing: ApplyClassname<SpacingProps> = (props) => {
  const { rest, spacingProps } = separateSpacingProps(props);
  const cName = clsx(
    props.className,
    'sp',
    'sp-emphase',

    getLookupValue('mb', spacingProps.mb || spacingProps.marginBottom),
    getLookupValue('mt', spacingProps.mt || spacingProps.marginTop),
    getLookupValue('pb', spacingProps.pb || spacingProps.paddingBottom),
    getLookupValue('pt', spacingProps.pt || spacingProps.paddingTop)
  );

  return { ...rest, className: cName };
};
