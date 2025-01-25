// global modules
import { createClientLogger, createRuntime } from '@repo/runtime';

export const runtime = createRuntime(createClientLogger());
