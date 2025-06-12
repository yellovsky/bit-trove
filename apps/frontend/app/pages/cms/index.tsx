import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [{ title: 'CMS' }, { content: 'noindex, nofollow', name: 'robots' }];
};

export default function CmsPage() {
  return <div>CmsPage</div>;
}
