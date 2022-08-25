import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  clean: true,
  platform: 'browser',
  target: 'esnext',
  format: ['esm'],
  minify: true,
  dts: true
})
