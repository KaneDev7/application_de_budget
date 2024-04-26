import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ['vitest-localstorage-mock'],
    mockReset: false,
    globals: true
  }
})
