import { test, expect } from "@playwright/test";

test("GET all bookings", async ({ request }) => {
  const response = await request.get(`/booking`);
  expect(response.status()).toBe(200);
  console.log(await response.json());
});