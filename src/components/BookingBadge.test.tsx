// ===== SESSION 12: Test 1 of 3 (Component test) =======================
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BookingBadge from "./BookingBadge";
import { BookingStatus, type Booking } from "../types/index";

const confirmedBooking: Booking = {
  id: "booking-101",
  sessionId: "session-001",
  tuteeId: "tutee-001",
  status: BookingStatus.Confirmed,
  time: "10:00 AM",
  durationMinutes: 60,
};

describe("BookingBadge", () => {
  it("renders the Confirmed status text", () => {
    render(<BookingBadge booking={confirmedBooking} />);
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
  });

  it("renders the Completed status text when status is Completed", () => {
    const completedBooking: Booking = {
      ...confirmedBooking,
      status: BookingStatus.Completed,
    };
    render(<BookingBadge booking={completedBooking} />);
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });
});
