import { test, expect } from "@playwright/test";
import { createBooking } from "../utils";

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

test("PUT a booking", async ({ request }) => {
  const bookingId = await createBooking(request, {
    firstname: "Evan",
    lastname: "Ferguson",
    totalprice: 729,
    depositpaid: true,
    bookingdates: {
      checkin: "2022-01-01",
      checkout: "2024-04-01",
    },
    additionalneeds: "Ballon D'or",
  });

  const response = await request.patch(`/booking/${bookingId}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      firstname: "Evan",
      lastname: "Ferguson",
      totalprice: 699,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2025-04-01",
      },
      additionalneeds: "Football",
    },
  });
  // Assert Status
  expect(response.status()).toBe(200);

  const res = await response.json();

  // Assert Important Response Property Values
  expect(res.firstname).toBe("Evan");
  expect(res.lastname).toBe("Ferguson");
  expect(res.totalprice).toBe(699);
  expect(res.depositpaid).toBe(true);
});

test("DELETE a booking", async ({ request }) => {
  const bookingId = await createBooking(request, {
    firstname: "John",
    lastname: "Egan",
    totalprice: 100,
    depositpaid: false,
    bookingdates: {
      checkin: "2022-01-01",
      checkout: "2024-04-01",
    },
    additionalneeds: "Kerry Jersey",
  });

  const response = await request.delete(`/booking/${bookingId}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  expect(response.status()).toBe(201);
});
