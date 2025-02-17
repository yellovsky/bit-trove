// global modules
import { Effect } from 'effect';
import { type Effector, Enforcer, type Filter, type Watcher } from 'casbin';
import { Inject, Injectable } from '@nestjs/common';

export type CasbinSub = string | null | undefined;
export type CasbinAct = 'read' | 'read_cms' | 'create' | 'update' | 'delete';
export type CasbinObjType = 'tutorial' | 'article' | 'blog_post';

@Injectable()
export class CasbinService {
  constructor(@Inject('CASBIN_ENFORCER') private readonly enforcer: Enforcer) {}

  enforce(...params: any[]): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() => this.enforcer.enforce(...params));
  }

  reloadPolicy(): Effect.Effect<void, Error> {
    return Effect.tryPromise(() => this.enforcer.loadPolicy());
  }

  addPolicy(...params: string[]): Effect.Effect<void, Error> {
    return Effect.gen(this, function* () {
      const added = yield* Effect.tryPromise(() =>
        this.enforcer.addPolicy(...params),
      );

      if (added) yield* Effect.tryPromise(() => this.enforcer.savePolicy());
    });
  }

  removePolicy(...params: string[]): Effect.Effect<void, Error> {
    return Effect.gen(this, function* () {
      const added = yield* Effect.tryPromise(() =>
        this.enforcer.removePolicy(...params),
      );

      if (added) yield* Effect.tryPromise(() => this.enforcer.savePolicy());
    });
  }

  getPolicy(): Effect.Effect<string[][], Error> {
    return Effect.tryPromise(() => this.enforcer.getPolicy());
  }

  getAllRoles(): Effect.Effect<string[], Error> {
    return Effect.tryPromise(() => this.enforcer.getAllRoles());
  }

  getAllObjects(): Effect.Effect<string[], Error> {
    return Effect.tryPromise(() => this.enforcer.getAllObjects());
  }

  getAllSubjects(): Effect.Effect<string[], Error> {
    return Effect.tryPromise(() => this.enforcer.getAllSubjects());
  }

  getUsersForRole(
    name: string,
    domain?: string,
  ): Effect.Effect<string[], Error> {
    return Effect.tryPromise(() => this.enforcer.getUsersForRole(name, domain));
  }

  hasRoleForUser(
    user: string,
    role: string,
    domain?: string,
  ): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() =>
      this.enforcer.hasRoleForUser(user, role, domain),
    );
  }

  addRoleForUser(
    user: string,
    role: string,
    domain?: string,
  ): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() =>
      this.enforcer.addRoleForUser(user, role, domain),
    );
  }

  deleteRoleForUser(
    user: string,
    role: string,
    domain?: string,
  ): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() =>
      this.enforcer.deleteRoleForUser(user, role, domain),
    );
  }

  deleteRolesForUser(
    user: string,
    domain?: string,
  ): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() =>
      this.enforcer.deleteRolesForUser(user, domain),
    );
  }

  deleteUser(user: string): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() => this.enforcer.deleteUser(user));
  }

  deleteRole(role: string): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() => this.enforcer.deleteRole(role));
  }

  deletePermission(...permissions: string[]): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() =>
      this.enforcer.deletePermission(...permissions),
    );
  }

  addPermissionForUser(
    user: string,
    ...permissions: string[]
  ): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() =>
      this.enforcer.addPermissionForUser(user, ...permissions),
    );
  }

  deletePermissionForUser(
    user: string,
    ...permissions: string[]
  ): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() =>
      this.enforcer.deletePermissionForUser(user, ...permissions),
    );
  }

  deletePermissionsForUser(user: string): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() =>
      this.enforcer.deletePermissionsForUser(user),
    );
  }

  getPermissionsForUser(user: string): Effect.Effect<string[][], Error> {
    return Effect.tryPromise(() => this.enforcer.getPermissionsForUser(user));
  }

  hasPermissionForUser(
    user: string,
    ...permissions: string[]
  ): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() =>
      this.enforcer.hasPermissionForUser(user, ...permissions),
    );
  }

  getAllActions(): Effect.Effect<string[], Error> {
    return Effect.tryPromise(() => this.enforcer.getAllActions());
  }

  hasPolicy(...params: string[]): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() => this.enforcer.hasPolicy(...params));
  }

  hasNamedPolicy(
    p: string,
    ...params: string[]
  ): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() => this.enforcer.hasNamedPolicy(p, ...params));
  }

  getRolesForUser(
    name: string,
    domain?: string,
  ): Effect.Effect<string[], Error> {
    return Effect.tryPromise(() => this.enforcer.getRolesForUser(name, domain));
  }

  getImplicitPermissionsForUser(
    name: string,
    ...domain: string[]
  ): Effect.Effect<string[][], Error> {
    return Effect.tryPromise(() =>
      this.enforcer.getImplicitPermissionsForUser(name, ...domain),
    );
  }

  getImplicitRolesForUser(
    name: string,
    ...domain: string[]
  ): Effect.Effect<string[], Error> {
    return Effect.tryPromise(() =>
      this.enforcer.getImplicitRolesForUser(name, ...domain),
    );
  }

  getNamedPolicy(name: string): Effect.Effect<string[][], Error> {
    return Effect.tryPromise(() => this.enforcer.getNamedPolicy(name));
  }

  addFunction(name: string, fn: any): Effect.Effect<void, Error> {
    return Effect.tryPromise(() => this.enforcer.addFunction(name, fn));
  }

  loadFilteredPolicy(filter: Filter): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() => this.enforcer.loadFilteredPolicy(filter));
  }

  enableAutoBuildRoleLinks(autoBuildRoleLinks: boolean): void {
    return this.enforcer.enableAutoBuildRoleLinks(autoBuildRoleLinks);
  }

  isFiltered(): boolean {
    return this.enforcer.isFiltered();
  }

  enableAutoSave(autoSave: boolean): void {
    return this.enforcer.enableAutoSave(autoSave);
  }

  setWatcher(watcher: Watcher): void {
    return this.enforcer.setWatcher(watcher);
  }

  enableLog(enable: boolean): void {
    return this.enforcer.enableLog(enable);
  }

  enableEnforce(enable: boolean): void {
    return this.enforcer.enableEnforce(enable);
  }

  setEffector(eft: Effector): void {
    return this.enforcer.setEffector(eft);
  }

  clearPolicy(): void {
    return this.enforcer.clearPolicy();
  }

  addGroupingPolicy(): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() => this.enforcer.addGroupingPolicy());
  }

  checkPermission(
    sub: CasbinSub,
    action: CasbinAct,
    objType: CasbinObjType,
    obj: object,
  ): Effect.Effect<boolean, Error> {
    return this.enforce(sub || 'public', action, objType, obj);
  }
}
