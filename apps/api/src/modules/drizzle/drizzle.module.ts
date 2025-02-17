// global modules
import { drizzle } from 'drizzle-orm/node-postgres';
import { Module } from '@nestjs/common';

// local modules
import { schema } from 'src/db';

export const DRIZZLE_SRV = 'DRIZZLE_SRV';

@Module({
  exports: [DRIZZLE_SRV],
  providers: [
    {
      provide: DRIZZLE_SRV,
      useFactory: async () => drizzle(process.env.DATABASE_URL1!, { schema }),
    },
  ],
})
export class DrizzleModule {}
