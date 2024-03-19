export const shortenItemsCount = (count: number): string => 
Intl.NumberFormat('en-US', {
  notation: "compact",
  maximumFractionDigits: 1
}).format(count);
 