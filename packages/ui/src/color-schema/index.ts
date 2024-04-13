export type ColorSchemaType =
  | 'primary'
  | 'yellow'
  | 'gray'
  | 'red'
  | 'green'
  | 'orange'
  | 'black-alpha'
  | 'white-alpha';

export interface HasColorSchema {
  colorSchema: ColorSchemaType;
}

export interface MayHaveColorSchema {
  colorSchema?: ColorSchemaType;
}

export const colorSchemaCn = (type: ColorSchemaType): string => `color-schema-${type}`;
