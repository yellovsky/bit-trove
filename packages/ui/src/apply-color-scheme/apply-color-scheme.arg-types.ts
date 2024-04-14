export const COLOR_SCHEMES = [
  'primary',
  'yellow',
  'gray',
  'red',
  'green',
  'orange',
  'black-alpha',
  'white-alpha',
] as const;

export const colorSchemeArgType = {
  control: 'select',
  defaultValue: 'md',
  description: 'Button color scheme',
  options: COLOR_SCHEMES,
  table: {
    category: 'Component props',
    type: { summary: COLOR_SCHEMES.map((scheme) => `"${scheme}"`).join(' | ') },
  },
  type: { name: 'other', value: COLOR_SCHEMES.map((scheme) => `"${scheme}"`).join(' | ') },
} as const;
