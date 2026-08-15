import type { Session } from "../types/index";

interface SessionCardProps {
  session: Session;
  onBook: (sessionId: number) => void;
}

function SessionCard({
  session,
  onBook,
}: SessionCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
        <div className="flex items-start justify-between gap-4">

          <div>
            <p className="text-sm font-medium text-blue-100">
              Tutoring Session
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              {session.subject}
            </h3>
          </div>

          <div className="rounded-xl bg-white/15 px-3 py-2 text-2xl backdrop-blur">
            📚
          </div>

        </div>
      </div>

      {/* Content */}
      <div className="p-6">

        {/* Session Details */}
        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Duration
            </p>

            <p className="mt-1 font-bold text-slate-800">
              ⏱ {session.durationMinutes} min
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Rate
            </p>

            <p className="mt-1 font-bold text-slate-800">
              ₱{session.ratePerHour}/hr
            </p>
          </div>

        </div>

        <div className="my-5 border-t border-slate-100" />

        {/* Tutor */}
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
            JM
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Janna Mikhaela
            </p>

            <p className="text-xs text-slate-500">
              Tutor
            </p>
          </div>

        </div>

        {/* Book Button */}
        <button
          type="button"
          onClick={() => onBook(session.id)}
          className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
        >
          Book This Session →
        </button>

      </div>
    </div>
  );
}

export default SessionCard;