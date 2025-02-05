// global modules
import {
  AbilityBuilder,
  type ForcedSubject,
  type InferSubjects,
  PureAbility,
} from '@casl/ability';

// common modules
import type { DBArticleAccessControl } from 'src/db-models/article';
import type { DBBlogPostAccessControl } from 'src/db-models/blog-post';
import type { DBGuideAccessControl } from 'src/db-models/guide';

export type Action = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type BlogPostSubject = ForcedSubject<'blog_post'> &
  DBBlogPostAccessControl;

export type GuideSubject = ForcedSubject<'guide'> & DBGuideAccessControl;

export type ArticleSubject = ForcedSubject<'article'> & DBArticleAccessControl;

export type Subject = InferSubjects<
  BlogPostSubject | ArticleSubject | GuideSubject
>;

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
