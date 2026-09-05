import type { Session, Booking } from "../types/index";
import { BookingStatus } from "../types/index";

const API_URL = "http://localhost:3001";

export interface CreateBookingData {
  sessionId: number;
  tuteeId: number;
  time: string;
  durationMinutes: number;
}

export async function fetchSessions(): Promise<Session[]> {
  const response = await fetch(`${API_URL}/sessions`);

  if (!response.ok) {
    throw new Error("Failed to fetch sessions");
  }

  return response.json() as Promise<Session[]>;
}

export async function fetchSessionById(
  id: number
): Promise<Session> {
  const response = await fetch(
    `${API_URL}/sessions/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch session");
  }

  return response.json() as Promise<Session>;
}

export async function createBooking(
  booking: CreateBookingData
): Promise<Booking> {
  const newBooking = {
    ...booking,
    status: BookingStatus.Confirmed,
    requestedAt: new Date().toISOString(),
  };

  const response = await fetch(
    `${API_URL}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooking),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }

  return response.json() as Promise<Booking>;
}

export async function fetchBookings(): Promise<Booking[]> {
  const response = await fetch(`${API_URL}/bookings`);

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const data = await response.json();

  return data.map((booking: Booking) => ({
    ...booking,
    status:
      booking.status ?? BookingStatus.Confirmed,
    requestedAt:
      booking.requestedAt ?? new Date().toISOString(),
  }));
}
export async function deleteBooking(
  id: string | number
): Promise<void> {
  const response = await fetch(
    `${API_URL}/bookings/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete booking");
  }
}  