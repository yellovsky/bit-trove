// global modules
import {
  AbilityBuilder,
  type ForcedSubject,
  type InferSubjects,
  PureAbility,
} from '@casl/ability';

// common modules
import type { DBAccount } from 'src/modules/auth';
import type { DBArticleAccessControl } from 'src/modules/article';
import type { DBBlogPostAccessControl } from 'src/modules/blog-post';
import type { DBTutorialAccessControl } from 'src/modules/tutorial';

export type Action = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type BlogPostSubject = ForcedSubject<'blog_post'> &
  DBBlogPostAccessControl;

export type TutorialSubject = ForcedSubject<'tutorial'> &
  DBTutorialAccessControl;

export type ArticleSubject = ForcedSubject<'article'> & DBArticleAccessControl;

export type Subject = InferSubjects<
  BlogPostSubject | ArticleSubject | TutorialSubject
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
  user: DBAccount | null,
  builder: AbilityBuilder<AppAbility>,
) => void;

export type ByRolePermissions = Partial<Record<Role, DefineRolePermissions>>;
