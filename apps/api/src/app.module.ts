// global modules
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

// common modules
import { ApiModule } from 'src/api';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ApiModule],
})
export class AppModule {}
