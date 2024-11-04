// global modules
import { Module } from '@nestjs/common';

// common modules
import { PrismaModule } from 'src/modules/prisma';

// local modules
import { CaslServiceClass } from './casl.service';

@Module({
  exports: [{ provide: 'CASL_SRV', useClass: CaslServiceClass }],
  imports: [PrismaModule],
  providers: [{ provide: 'CASL_SRV', useClass: CaslServiceClass }],
})
export class CaslModule {}
