import type { PrismaClient } from '@generated/prisma';

const blogPostPolicies = [{ act: 'read', cond: 'true', sub: 'public' }].map((obj) => ({
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
}> = [...accountPolicies, ...permissionPolicyPolicies, ...blogPostPolicies].map((obj) => ({
  ...obj,
  ptype: 'p',
}));

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
  seed: (tx: PrismaClient) => tx.casbinRule.createMany({ data: casbinRules }),
};
