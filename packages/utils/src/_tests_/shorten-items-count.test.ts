// local modules
import { shortenItemsCount } from '../shorten-items-count';

describe('shortenItemsCount', () => {
  it.each([
    [0, '0'],
    [99, '99'],
    [100, '100'],
    [999, '999'],
    [1_000, '1K'],
    [1_210, '1.2K'],
    [999_999, '1M'],
    [1_000_001, '1M'],
  ])('shortenItemsCount(%s)', (count, expected) => {
    expect(shortenItemsCount(count)).toEqual(expected);
  });
});
