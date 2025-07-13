import type { PrismaClient } from '@generated/prisma';

import { seedLocalizationArticle } from './blog-posts/001-localization.blog-post-seed';
import { seedSpaWithSsrArticle } from './blog-posts/002-spa-with-ssr-seed';
import { seedCssContainerQueriesArticle } from './shards/001-css-container-queries.shard-seed';
import { seedCssEnvIsUnderratedArticle } from './shards/002-css-env-is-underrated.shard-seed';
import { seedEnterkeyhintAttributeArticle } from './shards/003-enterkeyhint-attribute.shard-seed';
import { seedFieldSizingContentArticle } from './shards/004-field-sizing-content.shard-seed';
import { seedFixTablerIconsViteArticle } from './shards/005-fix-tabler-icons-vite.shard-seed';
import { seedHtmlDialogElementArticle } from './shards/006-html-dialog-element.shard-seed';
import { seedLightningcssArticle } from './shards/007-lightningcss.shard-seed';
import { seedOklchColorSpaceArticle } from './shards/008-oklch-color-space.shard-seed';
import { seedRequestAnimationFrameNot60HzArticle } from './shards/009-requestanimationframe-not-60hz.shard-seed';
import { seedScrollbarGutterArticle } from './shards/010-scrollbar-gutter.shard-seed';
import { seedTargetTextPseudoElementArticle } from './shards/011-target-text-pseudo-element.shard-seed';
import { seedTextWrapBalanceArticle } from './shards/012-text-wrap-balance.shard-seed';
import { seedWidthMaxContentVsInlineBlockArticle } from './shards/013-width-max-content-vs-inline-block.shard-seed';

export const articlesSeeder = {
  clear: async (tx: PrismaClient) => {
    await tx.article.deleteMany();
    await tx.articleEntry.deleteMany();
  },
  seed: async (tx: PrismaClient) => {
    await seedLocalizationArticle(tx);
    await seedSpaWithSsrArticle(tx);

    await seedCssContainerQueriesArticle(tx);
    await seedCssEnvIsUnderratedArticle(tx);
    await seedEnterkeyhintAttributeArticle(tx);
    await seedFieldSizingContentArticle(tx);
    await seedFixTablerIconsViteArticle(tx);
    await seedHtmlDialogElementArticle(tx);
    await seedLightningcssArticle(tx);
    await seedOklchColorSpaceArticle(tx);
    await seedRequestAnimationFrameNot60HzArticle(tx);
    await seedScrollbarGutterArticle(tx);
    await seedTargetTextPseudoElementArticle(tx);
    await seedTextWrapBalanceArticle(tx);
    await seedWidthMaxContentVsInlineBlockArticle(tx);
  },
};
