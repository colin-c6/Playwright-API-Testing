export async function createBooking(request, bookingData) {
  const response = await request.post(`/booking`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: bookingData,
  });

  const res = await response.json();
  return res.bookingid;
}
