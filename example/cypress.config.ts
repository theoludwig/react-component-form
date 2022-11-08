import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: false,
  video: false,
  downloadsFolder: undefined,
  screenshotOnRunFailure: false,
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
    supportFile: false
  }
})
