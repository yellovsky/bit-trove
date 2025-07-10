import type { PrismaClient } from '@generated/prisma';

import { seedCssContainerQueriesShard } from './css-container-queries.shard-seed';
import { seedCssEnvIsUnderratedShard } from './css-env-is-underrated.shard-seed';
import { seedEnterkeyhintAttributeShard } from './enterkeyhint-attribute.shard-seed';
import { seedFieldSizingContentShard } from './field-sizing-content.shard-seed';
import { seedFixTablerIconsViteShard } from './fix-tabler-icons-vite.shard-seed';
import { seedHtmlDialogElementShard } from './html-dialog-element.shard-seed';
import { seedLightningcssShard } from './lightningcss.shard-seed';
import { seedOklchColorSpaceShard } from './oklch-color-space.shard-seed';
import { seedRequestAnimationFrameNot60HzShard } from './requestanimationframe-not-60hz.shard-seed';
import { seedScrollbarGutterShard } from './scrollbar-gutter.shard-seed';
import { seedTargetTextPseudoElementShard } from './target-text-pseudo-element.shard-seed';
import { seedTextWrapBalanceShard } from './text-wrap-balance.shard-seed';
import { seedWidthMaxContentVsInlineBlockShard } from './width-max-content-vs-inline-block.shard-seed';

export const shardsSeeder = {
  clear: async (tx: PrismaClient) => {
    await tx.shard.deleteMany();
    await tx.shardEntry.deleteMany();
  },
  seed: async (tx: PrismaClient) => {
    await seedFixTablerIconsViteShard(tx);
    await seedCssEnvIsUnderratedShard(tx);
    await seedWidthMaxContentVsInlineBlockShard(tx);
    await seedTextWrapBalanceShard(tx);
    await seedFieldSizingContentShard(tx);
    await seedTargetTextPseudoElementShard(tx);
    await seedScrollbarGutterShard(tx);
    await seedHtmlDialogElementShard(tx);
    await seedEnterkeyhintAttributeShard(tx);
    await seedLightningcssShard(tx);
    await seedOklchColorSpaceShard(tx);
    await seedRequestAnimationFrameNot60HzShard(tx);
    await seedCssContainerQueriesShard(tx);
  },
};
