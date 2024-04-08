export const shortenItemsCount = (count: number): string =>
  Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    notation: 'compact',
  }).format(count);
