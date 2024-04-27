import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ['vitest-localstorage-mock'],
    mockReset: false,
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
    environment : 'jsdom',
    environmentMatchGlobs: [
      ['tests/dom/**', 'jsdom'],
    ]
  }
})
