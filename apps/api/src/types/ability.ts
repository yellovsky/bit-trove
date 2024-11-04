// global modules
import {
  AbilityBuilder,
  type ForcedSubject,
  type InferSubjects,
  PureAbility,
} from '@casl/ability';

// common modules
import type { DBArticleFragment } from 'src/db-models/article';
import type { DBBlogPostFragment } from 'src/db-models/blog-post';

export type Action = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type BlogPostSubject = ForcedSubject<'blog_post'> &
  DBBlogPostFragment<{ published_at: true }>;

export type ArticleSubject = ForcedSubject<'article'> &
  DBArticleFragment<{ published_at: true }>;

export type Subject = InferSubjects<BlogPostSubject | ArticleSubject>;

export type AppAbility = PureAbility<[Action, Subject]>;
export type Role = 'admin' | 'support' | 'content_manager' | 'user' | 'public';

export const isRole = (maybeRole: unknown): maybeRole is Role =>
  maybeRole === 'admin' ||
  maybeRole === 'support' ||
  maybeRole === 'content_manager' ||
  maybeRole === 'user' ||
  maybeRole === 'public';

export type DefineRolePermissions = (
  user: null,
  builder: AbilityBuilder<AppAbility>,
) => void;

export type ByRolePermissions = Partial<Record<Role, DefineRolePermissions>>;
