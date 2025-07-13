import type { PrismaClient } from '@generated/prisma';

const articlePolicies = [
  // Published shards are always readable
  { act: 'read', cond: 'r.obj.publishedAt != null', sub: 'public' },
  // Unpublished shards are readable by the author
  { act: 'read', cond: 'r.obj.author.id == r.sub', sub: 'authorized' },
  // Unpublished shards are updatable by the author
  { act: 'update', cond: 'r.obj.author.id == r.sub', sub: 'authorized' },
  // Admin can read all shards
  { act: 'read', cond: 'true', sub: 'admin' },
  // Admin can create shards
  { act: 'create', cond: 'true', sub: 'admin' },
  // Admin can update all shards
  { act: 'update', cond: 'true', sub: 'admin' },
].map((obj) => ({
  ...obj,
  objType: 'article',
}));

const shardPolicies = [
  // Published shards are always readable
  { act: 'read', cond: 'r.obj.publishedAt != null', sub: 'public' },
  // Unpublished shards are readable by the author
  { act: 'read', cond: 'r.obj.author.id == r.sub', sub: 'authorized' },
  // Unpublished shards are updatable by the author
  { act: 'update', cond: 'r.obj.author.id == r.sub', sub: 'authorized' },
  // Admin can read all shards
  { act: 'read', cond: 'true', sub: 'admin' },
  // Admin can create shards
  { act: 'create', cond: 'true', sub: 'admin' },
  // Admin can update all shards
  { act: 'update', cond: 'true', sub: 'admin' },
].map((obj) => ({
  ...obj,
  objType: 'shard',
}));

const blogPostPolicies = [
  // Published shards are always readable
  { act: 'read', cond: 'r.obj.publishedAt != null', sub: 'public' },
  // Unpublished shards are readable by the author
  { act: 'read', cond: 'r.obj.author.id == r.sub', sub: 'authorized' },
  // Unpublished shards are updatable by the author
  { act: 'update', cond: 'r.obj.author.id == r.sub', sub: 'authorized' },
  // Admin can read all shards
  { act: 'read', cond: 'true', sub: 'admin' },
  // Admin can create shards
  { act: 'create', cond: 'true', sub: 'admin' },
  // Admin can update all shards
  { act: 'update', cond: 'true', sub: 'admin' },
].map((obj) => ({
  ...obj,
  objType: 'blog_post',
}));

const accountPolicies = [
  { act: 'read', cond: 'true', sub: 'admin' },
  { act: 'read_cms', cond: 'true', sub: 'admin' },
  { act: 'update', cond: 'true', sub: 'admin' },
  { act: 'create', cond: 'true', sub: 'admin' },
  { act: 'delete', cond: 'true', sub: 'admin' },
  { act: 'delete', cond: 'obj.id == sub', sub: 'member' },
].map((obj) => ({ ...obj, objType: 'account' }));

const permissionPolicyPolicies = [
  { act: 'view', cond: 'true', sub: 'admin' },
  { act: 'read', cond: 'true', sub: 'admin' },
  { act: 'read_cms', cond: 'true', sub: 'admin' },
  { act: 'update', cond: 'true', sub: 'admin' },
  { act: 'create', cond: 'true', sub: 'admin' },
  { act: 'delete', cond: 'true', sub: 'admin' },
].map((obj) => ({ ...obj, objType: 'permission_policy' }));

const policies: Array<{
  ptype: string;
  objType: string;
  sub: string;
  act: string;
  cond: string;
  note?: string;
}> = [...accountPolicies, ...permissionPolicyPolicies, ...blogPostPolicies, ...shardPolicies, ...articlePolicies].map(
  (obj) => ({
    ...obj,
    ptype: 'p',
  })
);

const casbinRules = [...policies].map((inp) => ({
  note: inp.note,
  ptype: inp.ptype,
  v0: inp.sub,
  v1: inp.act,
  v2: inp.objType,
  v3: inp.cond,
}));

export const cabinRulesSeeder = {
  clear: (tx: PrismaClient) => tx.casbinRule.deleteMany(),
  seed: async (tx: PrismaClient) => {
    await tx.casbinRule.createMany({ data: casbinRules });
    await tx.casbinRule.createMany({ data: [{ ptype: 'g', v0: 'admin', v1: 'public' }] });
  },
};
