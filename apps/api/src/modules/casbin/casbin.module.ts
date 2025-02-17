// global modules
import { Module } from '@nestjs/common';
import { newEnforcer } from 'casbin';
import path from 'path';

// common modules
import type { DB } from 'src/db';

// local modules
import { CasbinService } from './services/casbin.service';
import { DrizzleAdapter } from './services/drizzle-casbin-adapter.service';
import { DRIZZLE_SRV, DrizzleModule } from '../drizzle';

@Module({
  exports: ['CASBIN_ENFORCER', CasbinService],
  imports: [DrizzleModule],
  providers: [
    {
      inject: [DRIZZLE_SRV],
      provide: 'CASBIN_ENFORCER',
      useFactory: async (db: DB) =>
        newEnforcer(
          path.join(__dirname, '../../../../model.conf'),
          new DrizzleAdapter(db),
        ),
    },
    CasbinService,
  ],
})
export class CasbinModule {}
