import { create } from "zustand";

import type { Booking } from "../types/index";
import { BookingStatus } from "../types/index";

interface BookingStore {
  bookings: Booking[];

  addBooking: (sessionId: number, tuteeId: number) => void;

  removeBooking: (bookingId: number) => void;
}

const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],

  addBooking: (sessionId: number, tuteeId: number) => {
    set((state) => {
      const newBooking: Booking = {
        id: Date.now(),
        sessionId,
        tuteeId,
        status: BookingStatus.Confirmed,
        requestedAt: new Date(),
      };

      return {
        bookings: [...state.bookings, newBooking],
      };
    });
  },

  removeBooking: (bookingId: number) => {
    set((state) => ({
      bookings: state.bookings.filter(
        (booking) => booking.id !== bookingId
      ),
    }));
  },
}));

export default useBookingStore;