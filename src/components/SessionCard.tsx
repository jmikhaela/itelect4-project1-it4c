import type { Session } from "../types/index";

interface SessionCardProps {
  session: Session;
  onBook: (sessionId: number) => void;
  isBooked: boolean;
}

function SessionCard({
  session,
  onBook,
  isBooked,
}: SessionCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h3 className="text-xl font-bold text-gray-800">
        {session.subject}
      </h3>

      <p className="mt-3 text-gray-600">
        Duration: {session.durationMinutes} minutes
      </p>

      <p className="text-gray-600">
        Rate: ₱{session.ratePerHour}/hour
      </p>

      {isBooked ? (
        <button
          type="button"
          disabled
          className="mt-4 w-full cursor-not-allowed rounded-lg bg-green-500 px-4 py-2 font-medium text-white"
        >
          Session Booked ✓
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onBook(session.id)}
          className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Book This Session
        </button>
      )}
    </div>
  );
}

export default SessionCard;