import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { AppConfigService } from '../interfaces/app-config.interface';

@Injectable()
export class AppConfigServiceImpl implements AppConfigService {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService
  ) {}

  get jwtSecret(): string {
    return this.configService.getOrThrow<string>('JWT_SECRET');
  }

  get corsOrigin(): string {
    return this.configService.getOrThrow<string>('CORS_ORIGIN');
  }
}
