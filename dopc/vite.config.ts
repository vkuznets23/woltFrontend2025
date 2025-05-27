import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        'dist/',
        '**/*.config.{js,ts}',
        '**/vite-env.d.ts',
        '**/*.d.ts',
        '**/index.ts',
        'playwright-report/',
        'src/types',
      ],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/testSetup.ts',
    include: ['tests/**/*.test.{ts,tsx}'],
    exclude: ['tests/e2e/**'],
  },
})
