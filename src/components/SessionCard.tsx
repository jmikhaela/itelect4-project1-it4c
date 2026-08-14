import type { Session } from "../types/index";

// Explicit Props interface -- required ng rubric
interface SessionCardProps {
  session: Session;
  onBook: (sessionId: number) => void;
}

function SessionCard({ session, onBook }: SessionCardProps) {
  return (
    <div className="session-card">
      <h3>{session.subject}</h3>
      <p>Duration: {session.durationMinutes} minutes</p>
      <p>Rate: ₱{session.ratePerHour}/hour</p>
      <button type="button" onClick={() => onBook(session.id)}>
        Book This Session
      </button>
    </div>
  );
}

export default SessionCard;