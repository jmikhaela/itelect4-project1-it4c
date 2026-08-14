import { BookingStatus } from "../types/index";
import type { Booking } from "../types/index";

// Explicit Props interface -- required ng rubric
interface BookingBadgeProps {
  booking: Booking;
}

function BookingBadge({ booking }: BookingBadgeProps) {
  // Simpleng function para malaman kung anong kulay ang gagamitin base sa status
  function getStatusColor(status: BookingStatus): string {
    switch (status) {
      case BookingStatus.Requested:
        return "orange";
      case BookingStatus.Confirmed:
        return "green";
      case BookingStatus.Completed:
        return "blue";
      default:
        return "gray";
    }
  }

  return (
    <span
      className="booking-badge"
      style={{ backgroundColor: getStatusColor(booking.status) }}
    >
      {BookingStatus[booking.status]}
    </span>
  );
}

export default BookingBadge;