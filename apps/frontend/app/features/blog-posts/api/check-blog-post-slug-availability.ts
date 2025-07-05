import type { ApiClient } from '@shared/lib/api-client';

// TODO: Create proper API endpoint for blog post slug availability
// This is a placeholder implementation
export const checkBlogPostSlugAvailability = (_apiClient: ApiClient) => async (_slug: string) => {
  // TODO: Replace with actual API call when backend endpoint is implemented
  return {
    data: {
      available: true,
      takenBy: null,
    },
  };
};
