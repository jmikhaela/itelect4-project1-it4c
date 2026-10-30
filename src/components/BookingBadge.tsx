import { BookingStatus } from "../types/index";
import type { Booking } from "../types/index";

interface BookingBadgeProps {
  booking: Booking;
}

function BookingBadge({ booking }: BookingBadgeProps) {
  const status: BookingStatus =
    typeof booking.status === "number"
      ? (booking.status as BookingStatus)
      : BookingStatus.Confirmed;

  function getStatusColor(s: BookingStatus): string {
    switch (s) {
      case BookingStatus.Requested:
        return "bg-yellow-500";
      case BookingStatus.Confirmed:
        return "bg-green-500";
      case BookingStatus.Completed:
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  }

  return (
    <span
      className={`rounded-full px-4 py-2 font-semibold text-white ${getStatusColor(
        status
      )}`}
    >
      {BookingStatus[status] ?? "Confirmed"}
    </span>
  );
}

export default BookingBadge;
