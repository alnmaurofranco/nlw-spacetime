import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    environmentMatchGlobs: [['src/infra/http/controller/**', 'prisma']],
  },
})
