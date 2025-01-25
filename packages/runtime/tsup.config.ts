// global modules
import { defineConfig } from 'tsup';

export default defineConfig({
  external: ['effect'],
  legacyOutput: true,
  replaceNodeEnv: true,
});
