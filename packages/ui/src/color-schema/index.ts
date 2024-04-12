export type ColorSchemaType =
  | 'primary'
  | 'yellow'
  | 'gray'
  | 'red'
  | 'green'
  | 'orange'
  | 'black-alpha'
  | 'white-alpha';

export const colorSchemaCn = (type: ColorSchemaType): string => `color-schema-${type}`;
