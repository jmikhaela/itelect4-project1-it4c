import { create } from "zustand";

import type { Booking, ID } from "../types/index";

interface BookingStore {
  bookings: Booking[];

  addBooking: (booking: Booking) => void;

  removeBooking: (bookingId: ID) => void;
}

const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],

  addBooking: (booking: Booking) => {
    set((state) => ({
      bookings: [...state.bookings, booking],
    }));
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