// @ts-check
import { defineConfig } from "@playwright/test";

process.env.API_BASE_URL = "https://restful-booker.herokuapp.com";

module.exports = defineConfig({
  testDir: "./api-tests",
  globalSetup: "./global-setup",
  use: {
    // All requests we send go to this API endpoint.
    baseURL: process.env.API_BASE_URL,
    extraHTTPHeaders: {
      Cookie: `token=${process.env.API_TOKEN}`,
    },
  },
  reporter: "html",
});
