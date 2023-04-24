import { test, expect } from "@playwright/test";

test("GET all bookings", async ({ request }) => {
  const response = await request.get(`/booking`);
  expect(response.status()).toBe(200);
});

test("POST a booking", async ({ request }) => {
  const response = await request.post(`/booking`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      firstname: "Stephen",
      lastname: "Kenny",
      totalprice: 999,
      depositpaid: false,
      bookingdates: {
        checkin: "2023-01-01",
        checkout: "2023-04-01",
      },
      additionalneeds: "Football",
    },
  });
  // Assert Status
  expect(response.status()).toBe(200);

  const res = await response.json();
  // Assert Response Property Types
  expect(typeof res.bookingid).toBe("number");
  expect(typeof res.booking).toBe("object");

  // Assert Important Response Property Values
  expect(res.booking.firstname).toBe("Stephen");
  expect(res.booking.lastname).toBe("Kenny");
  expect(res.booking.totalprice).toBe(999);
  expect(res.booking.depositpaid).toBe(false);
});
