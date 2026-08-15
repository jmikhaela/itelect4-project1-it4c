import BookingBadge from "../components/BookingBadge";
import useBookingStore from "../store/bookingStore";

function BookingsPage() {
  const bookings = useBookingStore(
    (state) => state.bookings
  );

  const removeBooking = useBookingStore(
    (state) => state.removeBooking
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <p className="font-semibold uppercase tracking-wide text-blue-600">
          Your Learning
        </p>

        <h1 className="mt-2 text-4xl font-extrabold text-slate-900">
          My Bookings
        </h1>

        <p className="mt-3 max-w-2xl text-slate-500">
          View and manage your tutoring sessions and booking
          status.
        </p>
      </section>

      {/* Booking Count */}
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-500">
          Total bookings
        </p>

        <p className="mt-1 text-3xl font-bold text-slate-900">
          {bookings.length}
        </p>
      </div>

      {/* Bookings */}
      {bookings.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    Tutoring Session
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Calculus 1
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                  📚
                </div>
              </div>

              {/* Session Details */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Duration
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    60 minutes
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Rate
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    ₱300/hour
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-sm font-medium text-slate-500">
                  Booking Status
                </p>

                <div className="mt-2">
                  <BookingBadge booking={booking} />
                </div>
              </div>

              {/* Booking ID */}
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">
                    Booking ID
                  </p>

                  <p className="font-semibold text-slate-700">
                    #{booking.id}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeBooking(booking.id)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
          <div className="text-5xl">
            📋
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-800">
            No bookings yet
          </h2>

          <p className="mt-2 text-slate-500">
            Browse available sessions and book your first
            tutoring session.
          </p>
        </section>
      )}
    </div>
  );
}

export default BookingsPage;