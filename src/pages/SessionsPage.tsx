import { useNavigate } from "react-router-dom";
import SessionCard from "../components/SessionCard";
import type { Session } from "../types/index";

function SessionsPage() {
  const navigate = useNavigate();

  const sessions: Session[] = [
    {
      id: 1,
      tutorId: 1,
      subject: "Calculus 1",
      durationMinutes: 60,
      ratePerHour: 300,
    },
  ];

  function handleBook(sessionId: number): void {
    navigate(`/sessions/${sessionId}`);
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">

      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Peer Tutoring
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Tutoring Sessions
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            Find a tutoring session that matches your learning needs
            and book a session with your tutor.
          </p>
        </div>

        {/* Search / Filter Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center dark:bg-slate-900 dark:ring-slate-800">

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Available Sessions
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {sessions.length} session available
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
            🎓 Tutor: Janna Mikhaela
          </div>

        </div>

        {/* Sessions */}
        {sessions.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {sessions.map((session: Session) => (
              <SessionCard
                key={session.id}
                session={session}
                onBook={handleBook}
              />
            ))}

          </div>
        ) : (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">

            <div className="text-5xl">
              📚
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              No Sessions Available
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              There are currently no tutoring sessions available.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default SessionsPage;