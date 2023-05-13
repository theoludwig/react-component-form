import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}'],
  sourcemap: false,
  clean: true,
  platform: 'browser',
  target: 'esnext',
  format: ['esm'],
  minify: false,
  outDir: 'build',
  dts: true
})
