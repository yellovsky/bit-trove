import { PlusCircle } from 'lucide-react';

import { Button } from '@repo/ui/components/button';
import { Link } from '@repo/ui/components/link';
import { Heading } from '@repo/ui/components/Typography';

import { getCreateBlogPostLink } from '@features/blog-posts';

export default function CMSBlogPostsRoute() {
  return (
    <div>
      <div className="mb-4 flex justify-between">
        <Heading className="mb-4" order={2}>
          Blog Posts
        </Heading>

        <Button asChild>
          <Link to={getCreateBlogPostLink()} variant="unstyled">
            <PlusCircle />
            Create Blog Post
          </Link>
        </Button>
      </div>

      <div className="py-8 text-center">
        <p className="text-muted-foreground">Blog posts list will be implemented here</p>
        <p className="mt-2 text-muted-foreground text-sm">
          TODO: Add blog posts table with filtering, search, and management features
        </p>
      </div>
    </div>
  );
}
