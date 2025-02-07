// global modules
import * as R from 'ramda';
import { AbilityBuilder } from '@casl/ability';

// common modules
import {
  type AppAbility,
  type ByRolePermissions,
  isRole,
  type Role,
} from 'src/types/ability';

const blogPostByRolePermissions: ByRolePermissions = {
  public(_currentUser, { can, cannot }) {
    can('read', 'blog_post');
    cannot('read', 'blog_post', ['published_at'], { published_at: null });
  },
  support(_currentUser, { can }) {
    can('manage', 'blog_post');
  },
};

const tutorialByRolePermissions: ByRolePermissions = {
  public(_currentUser, { can, cannot }) {
    can('read', 'tutorial');
    cannot('read', 'tutorial', ['published_at'], { published_at: null });
  },
  support(_currentUser, { can }) {
    can('manage', 'tutorial');
  },
};

const makePermissionByRole =
  (byRolePermissions: ByRolePermissions) =>
  (abilityBuilder: AbilityBuilder<AppAbility>, currentUser: null) => {
    const roleNames: Role[] = R.uniq([
      'public',
      currentUser ? 'user' : undefined,
    ]).filter(isRole);

    for (const roleName of roleNames) {
      const fn = byRolePermissions[roleName];
      fn?.(currentUser, abilityBuilder);
    }
  };

export const setUserPermissions = (
  abilityBuilder: AbilityBuilder<AppAbility>,
  currentUser: null,
): void => {
  [blogPostByRolePermissions, tutorialByRolePermissions]
    .map(makePermissionByRole)
    .forEach((fn) => fn(abilityBuilder, currentUser));
};
