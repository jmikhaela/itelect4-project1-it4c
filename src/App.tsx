import UserCard from "./components/UserCard";
import SessionCard from "./components/SessionCard";
import BookingBadge from "./components/BookingBadge";
import { BookingStatus } from "./types/index";
import type { User, Session, Booking } from "./types/index";
import "./App.css";

// ===== Mock data =====
const mockUser: User = {
  id: 1,
  name: "Janna Alcantara",
  email: "janna@example.com",
  role: "tutor",
  isActive: true,
};

const mockSession: Session = {
  id: 1,
  tutorId: 1,
  subject: "Calculus 1",
  durationMinutes: 60,
  ratePerHour: 300,
};

const mockBooking: Booking = {
  id: 1,
  sessionId: 1,
  tuteeId: 2,
  status: BookingStatus.Confirmed,
  requestedAt: new Date(),
};

function App() {
  function handleSelectUser(id: number): void {
    console.log("Selected user:", id);
  }

  function handleBookSession(sessionId: number): void {
    console.log("Booked session:", sessionId);
  }

  return (
    <div className="app">
      <h1>Peer Tutoring Platform</h1>

      <UserCard user={mockUser} onSelect={handleSelectUser} />
      <SessionCard session={mockSession} onBook={handleBookSession} />
      <BookingBadge booking={mockBooking} />
    </div>
  );
}

export default App;