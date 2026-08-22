import { create } from "zustand";

import type { Booking, ID } from "../types/index";
import { BookingStatus } from "../types/index";

interface BookingStore {
  bookings: Booking[];

  addBooking: (
    sessionId: number,
    tuteeId: number,
    time: string,
    durationMinutes: number
  ) => void;

  removeBooking: (bookingId: ID) => void;
}

const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],

  addBooking: (
    sessionId: number,
    tuteeId: number,
    time: string,
    durationMinutes: number
  ) => {
    set((state) => {
      const newBooking: Booking = {
        id: Date.now(),
        sessionId,
        tuteeId,
        status: BookingStatus.Confirmed,
        requestedAt: new Date(),
        time,
        durationMinutes,
      };

      return {
        bookings: [...state.bookings, newBooking],
      };
    });
  },

  removeBooking: (bookingId: ID) => {
    set((state) => ({
      bookings: state.bookings.filter(
        (booking) => booking.id !== bookingId
      ),
    }));
  },
}));

export default useBookingStore;