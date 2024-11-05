export interface ItemsWithTotal<TItem> {
  items: TItem[];
  total: number;
}

export interface ItemsWithTotalAndPagination<TItem>
  extends ItemsWithTotal<TItem> {
  limit: number;
  offset: number;
}
