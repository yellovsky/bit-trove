// global modules
import { create } from '@yornaath/batshit';
import type { QueryFunction } from '@tanstack/react-query';

import {
  type APIResponse,
  type APIResponseCollection,
  getApiClient,
} from '@bit-trove/api-models/common';

export interface ViewsCount {
  views_count: number;
}

export type ViewsCountResponse = APIResponse<ViewsCount>;
export type ViewsCountResponseCollection = APIResponseCollection<ViewsCount>;

const blogpostsViews = create({
  fetcher: (id_in: number[]) =>
    getApiClient()
      .get<ViewsCountResponseCollection>('/blogpost-views', {
        params: { filters: { id: { $in: id_in } } },
      })
      .then((response) => response.data),

  resolver: (collectionResponse, id): ViewsCountResponse => {
    const founded = collectionResponse.data.find((response) => response.id === id);
    return founded ? { data: founded } : { data: { attributes: { views_count: 0 }, id } };
  },
});

export const getBlogpostViews: QueryFunction<
  ViewsCountResponse,
  ['blogpost_views_count', number]
> = ({ queryKey: [_, id] }) => blogpostsViews.fetch(id);

export const incrementBlogpostViews = (blogpostID: number) =>
  getApiClient()
    .post<ViewsCountResponse>('/blogpost-views', { id: blogpostID })
    .then((response) => response.data);
