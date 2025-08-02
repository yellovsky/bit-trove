export const getLastMod = (maybeDate: Date | number): string => {
  const date = new Date(maybeDate);

  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};
