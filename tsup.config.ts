import { defineConfig } from 'tsup'
import solidPlugin from 'tsup-plugin-solid'

export default defineConfig({
  entry: ['src/index.tsx'],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  plugins: [solidPlugin()],
})
