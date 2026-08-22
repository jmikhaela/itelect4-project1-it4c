import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import BookingBadge from "../components/BookingBadge";
import {
  deleteBooking,
  fetchBookings,
  fetchSessions,
} from "../api/client";

function BookingsPage() {
  const queryClient = useQueryClient();

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    isError: bookingsError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  const {
    data: sessions = [],
    isLoading: sessionsLoading,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  });

  const cancelBooking = useMutation({
    mutationFn: (bookingId: string | number) =>
      deleteBooking(bookingId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });

  if (bookingsLoading || sessionsLoading) {
    return (
      <div className="space-y-8">
        <section>
          <p className="font-semibold uppercase tracking-wide text-blue-600">
            Your Learning
          </p>

          <h1 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white">
            My Bookings
          </h1>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Loading your bookings...
          </p>
        </section>
      </div>
    );
  }

  if (bookingsError) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Unable to load bookings
        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Please make sure JSON Server is running.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <p className="font-semibold uppercase tracking-wide text-blue-600">
          Your Learning
        </p>

        <h1 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white">
          My Bookings
        </h1>

        <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
          View and manage your tutoring sessions and booking
          status.
        </p>
      </section>

      {/* Booking Count */}
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Total bookings
        </p>

        <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
          {bookings.length}
        </p>
      </div>

      {/* Bookings */}
      {bookings.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {bookings.map((booking) => {
            const session = sessions.find(
              (item) => item.id === booking.sessionId
            );

            return (
              <div
                key={booking.id}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg dark:bg-slate-900 dark:ring-slate-800"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-600">
                      Tutoring Session
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                      {session?.subject ?? "Session"}
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl dark:bg-blue-900/40">
                    📚
                  </div>
                </div>

                {/* Tutor */}
                <div className="mt-5">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Tutor
                  </p>

                  <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                    Janna Mikhaela
                  </p>
                </div>

                {/* Session Details */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Time
                    </p>

                    <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                      {booking.time}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Duration
                    </p>

                    <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                      {booking.durationMinutes} minutes
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Rate
                    </p>

                    <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                      ₱{session?.ratePerHour ?? 0}/hour
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Subject
                    </p>

                    <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                      {session?.subject ?? "Session"}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Booking Status
                  </p>

                  <div className="mt-2">
                    <BookingBadge booking={booking} />
                  </div>
                </div>

                {/* Booking ID + Cancel */}
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">
                      Booking ID
                    </p>

                    <p className="font-semibold text-slate-700 dark:text-slate-300">
                      #{booking.id}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={cancelBooking.isPending}
                    onClick={() =>
                      cancelBooking.mutate(booking.id)
                    }
                    className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {cancelBooking.isPending
                      ? "Cancelling..."
                      : "Cancel Booking"}
                  </button>
                </div>

                {/* Cancel Error */}
                {cancelBooking.isError && (
                  <p className="mt-3 text-sm text-red-600">
                    Failed to cancel booking. Please try again.
                  </p>
                )}
              </div>
            );
          })}
        </section>
      ) : (
        <section className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <div className="text-5xl">📋</div>

          <h2 className="mt-5 text-2xl font-bold text-slate-800 dark:text-white">
            No bookings yet
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Browse available sessions and book your first
            tutoring session.
          </p>
        </section>
      )}
    </div>
  );
}

export default BookingsPage;