// local modules
import { BlogPostData } from './seed-blog-post.types';

export const testBlogPostData: BlogPostData = {
  published_at: new Date(),
  slug: 'test-1',

  article: {
    original_language_code: 'ru',
    published_at: new Date(),
    translations: [
      {
        language_code: 'ru',
        published_at: new Date(),
        title: 'Test title from db',
      },

      {
        language_code: 'en',
        published_at: new Date(),
        title: 'Test title from db - english',
      },
    ],
  },
};
