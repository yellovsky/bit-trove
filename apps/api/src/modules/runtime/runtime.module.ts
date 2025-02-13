// global modules
import { Module } from '@nestjs/common';

// local modules
import { RuntimeService } from './services/runtime.service';

/**
 * The `RuntimeModule` class serves as a module definition for the runtime environment
 * within the application. This module is responsible for configuring and managing
 * runtime-specific services and components.
 */
@Module({
  exports: [RuntimeService],
  providers: [RuntimeService],
})
export class RuntimeModule {}
