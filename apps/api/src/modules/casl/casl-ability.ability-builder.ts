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

const guideByRolePermissions: ByRolePermissions = {
  public(_currentUser, { can, cannot }) {
    can('read', 'guide');
    cannot('read', 'guide', ['published_at'], { published_at: null });
  },
  support(_currentUser, { can }) {
    can('manage', 'guide');
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
  [blogPostByRolePermissions, guideByRolePermissions]
    .map(makePermissionByRole)
    .forEach((fn) => fn(abilityBuilder, currentUser));
};
