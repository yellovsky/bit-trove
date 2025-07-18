import { Module } from '@nestjs/common';

import { HealthController } from './presentation/heath.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
