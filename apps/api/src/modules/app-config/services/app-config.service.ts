// global modules
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get jwtSecret(): string {
    return this.configService.getOrThrow<string>('JWT_SECRET');
  }

  get webClientHostname(): string {
    return this.configService.getOrThrow<string>('WEB_CLIENT_HOSTNAME');
  }
}
