// global modules
import { Module } from '@nestjs/common';

// local modules
import { RUNTIME_SRV } from './runtime.types';
import { RuntimeServiceClass } from './runtime.service';

/**
 * The `RuntimeModule` class serves as a module definition for the runtime environment
 * within the application. This module is responsible for configuring and managing
 * runtime-specific services and components.
 */
@Module({
  exports: [{ provide: RUNTIME_SRV, useClass: RuntimeServiceClass }],
  providers: [{ provide: RUNTIME_SRV, useClass: RuntimeServiceClass }],
})
export class RuntimeModule {}
