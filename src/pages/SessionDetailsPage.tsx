import { useNavigate, useParams } from "react-router-dom";
import type { Session, User } from "../types/index";
import useBookingStore from "../store/bookingStore";

function SessionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Zustand
  const addBooking = useBookingStore(
    (state) => state.addBooking
  );

  // Current tutor
  const tutor: User = {
    id: 1,
    name: "Janna Alcantara",
    email: "janna@example.com",
    role: "tutor",
    isActive: true,
  };

  // Mock sessions
  const sessions: Session[] = [
    {
      id: 1,
      tutorId: 1,
      subject: "Calculus 1",
      durationMinutes: 60,
      ratePerHour: 300,
    },
  ];

  const sessionId = Number(id);

  const session = sessions.find(
    (item: Session) => item.id === sessionId
  );

  // Session does not exist
  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center shadow dark:bg-slate-900">

          <div className="text-5xl">
            🔍
          </div>

          <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
            Session Not Found
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            The tutoring session you are looking for does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/sessions")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            ← Back to Sessions
          </button>

        </div>
      </div>
    );
  }

  // Book session
  function handleBook(): void {
    const tuteeId = 2;

    addBooking(sessionId, tuteeId);

    navigate("/bookings");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">

      <main className="mx-auto max-w-5xl px-6 py-10">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/sessions")}
          className="mb-8 font-semibold text-blue-600 transition hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Back to Sessions
        </button>

        {/* Main Card */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white">

            <p className="text-sm font-medium text-blue-100">
              Tutoring Session
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              {session.subject}
            </h1>

            <p className="mt-3 text-blue-100">
              One-on-one peer tutoring session
            </p>

          </div>

          {/* Content */}
          <div className="p-8">

            <div className="grid gap-8 md:grid-cols-2">

              {/* Session Information */}
              <div>

                <h2 className="mb-5 text-xl font-bold">
                  Session Information
                </h2>

                <div className="space-y-4">

                  {/* Subject */}
                  <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Subject
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {session.subject}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Duration
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      ⏱ {session.durationMinutes} minutes
                    </p>
                  </div>

                  {/* Rate */}
                  <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Rate
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      ₱{session.ratePerHour} / hour
                    </p>
                  </div>

                </div>

              </div>

              {/* Tutor Information */}
              <div>

                <h2 className="mb-5 text-xl font-bold">
                  Tutor Information
                </h2>

                <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-700">

                  <div className="flex items-center gap-4">

                    {/* Avatar */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                      JA
                    </div>

                    <div>
                      <h3 className="text-lg font-bold">
                        {tutor.name}
                      </h3>

                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {tutor.email}
                      </p>

                      <p className="mt-1 text-sm font-medium text-green-600">
                        ● Available
                      </p>
                    </div>

                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-700">

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Tutor Role
                    </p>

                    <p className="mt-1 font-semibold capitalize">
                      {tutor.role}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Booking Section */}
            <div className="mt-10 rounded-2xl bg-blue-50 p-6 dark:bg-blue-950/30">

              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                <div>

                  <h2 className="text-xl font-bold">
                    Ready to book?
                  </h2>

                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Reserve this tutoring session with{" "}
                    {tutor.name}.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={handleBook}
                  className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
                >
                  Book This Session →
                </button>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-200 bg-white py-8 text-center dark:border-slate-800 dark:bg-slate-900">

        <p className="text-sm text-slate-500 dark:text-slate-400">
          © 2026 Peer Tutoring Platform
        </p>

      </footer>

    </div>
  );
}

export default SessionDetailsPage;