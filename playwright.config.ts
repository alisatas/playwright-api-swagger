import { defineConfig, devices } from '@playwright/test';

// Environment variables are loaded via npm scripts or system environment

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? parseInt(process.env.API_RETRIES || '2') : 0,
  workers: process.env.CI ? parseInt(process.env.PARALLEL_WORKERS || '4') : undefined,
  reporter: process.env.REPORT_FORMAT === 'line' ? 'line' : 'html',
  timeout: parseInt(process.env.API_TIMEOUT || '30000'),
  use: {
    baseURL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
    trace: process.env.TRACE_ON_FAILURE === 'true' ? 'on-first-retry' : 'off',
    screenshot: 'only-on-failure',
    extraHTTPHeaders: {
      // Add API key if provided
      ...(process.env.API_KEY && { 'X-API-Key': process.env.API_KEY }),
      // Add auth token if provided
      ...(process.env.AUTH_TOKEN && { 'Authorization': `Bearer ${process.env.AUTH_TOKEN}` }),
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
