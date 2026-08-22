import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import SessionCard from "../components/SessionCard";
import { fetchSessions } from "../api/client";

import type { Session } from "../types/index";

function SessionsPage() {
  const navigate = useNavigate();

  const {
    data: sessions = [],
    isLoading,
    isError,
    error,
  } = useQuery<Session[], Error>({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  });

  function handleBook(sessionId: number): void {
    navigate(`/sessions/${sessionId}`);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
              Loading tutoring sessions...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-red-200 dark:bg-slate-900">
            <h1 className="text-2xl font-bold text-red-600">
              Unable to load sessions
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {error.message}
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Make sure JSON Server is running on port 3000.
            </p>
          </div>
        </div>
      </div>
    );
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

        {/* Available Sessions */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center dark:bg-slate-900 dark:ring-slate-800">

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Available Sessions
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {sessions.length} sessions available
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
            🎓 Tutor: Janna Mikhaela
          </div>

        </div>

        {/* Sessions */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {sessions.map((session: Session) => (
            <SessionCard
              key={session.id}
              session={session}
              onBook={handleBook}
            />
          ))}

        </div>

      </div>
    </div>
  );
}

export default SessionsPage;