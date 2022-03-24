import { defineConfig } from 'tsup';
import { solidPlugin } from 'esbuild-plugin-solid';

export default defineConfig({
  entry: ['src/index.tsx'],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  esbuildPlugins: [solidPlugin()],
});
