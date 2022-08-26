import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: false,
  video: false,
  downloadsFolder: undefined,
  screenshotOnRunFailure: false,

  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false
  }
})