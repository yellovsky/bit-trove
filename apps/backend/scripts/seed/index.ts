import { PrismaClient } from '@generated/prisma';
import * as R from 'ramda';

import { accountsSeeder } from './account.seed';
import { articleRelationsSeeder } from './article-relations';
import { articlesSeeder } from './articles';
import { cabinRulesSeeder } from './casbin-rule.seed';
import { languagesSeeder } from './languages.seed';
import { tagsSeeder } from './tags';

const seeders = [languagesSeeder, cabinRulesSeeder, accountsSeeder, tagsSeeder, articlesSeeder, articleRelationsSeeder];

const main = async () => {
  const prisma = new PrismaClient();

  try {
    for (const seeder of R.reverse(seeders)) {
      await seeder.clear(prisma);
    }

    for (const seeder of seeders) {
      await seeder.seed(prisma);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
