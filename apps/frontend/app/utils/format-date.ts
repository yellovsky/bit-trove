export const formatDate = (
  date: Date | string,
  locale: string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};
