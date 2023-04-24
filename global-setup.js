import { request } from "@playwright/test";

// global-setup.js
async function globalSetup() {
  const context = await request.newContext({
    baseURL: process.env.API_BASE_URL,
  });

  const response = await context.post(`/auth`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username: "admin",
      password: "password123",
    },
  });

  const responseBody = await response.json();
  process.env.API_TOKEN = responseBody.token;
}

export default globalSetup;
