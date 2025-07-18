import { Controller, Get } from '@nestjs/common';

import { Public } from 'src/shared/decorators/public';

@Controller('health')
export class HealthController {
  @Get()
  @Public()
  check() {
    return { status: 'ok' };
  }
}
