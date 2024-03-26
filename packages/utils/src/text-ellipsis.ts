export const textEllipsis = (text: string, end = 250): string => {
  if (text.length <= end) return text;

  const sliced = text.slice(0, end).trim();

  switch (sliced.at(-1)) {
    case '.':
      return `${sliced}..`;
    default:
      return `${sliced}...`;
  }
};
