export const getLastMod = (maybeDate: Date | number): string => {
  const date = new Date(maybeDate);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
