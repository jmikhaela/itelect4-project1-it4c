import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import UserCard from "./components/UserCard";
import SessionCard from "./components/SessionCard";
import BookingBadge from "./components/BookingBadge";

import { BookingStatus } from "./types/index";
import type { User, Session, Booking } from "./types/index";

import useToggle from "./hooks/UseToggle";
import usePrevious from "./hooks/UsePrevious";

import "./App.css";

function App() {
  // =========================
  // STATE
  // =========================

  const [users, setUsers] = useState<User[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [searchText, setSearchText] = useState<string>("");

  // =========================
  // useRef
  // =========================

  const searchInputRef = useRef<HTMLInputElement>(null);

  // =========================
  // Custom Hooks
  // =========================

  const [showInfo, toggleInfo] = useToggle(false);

  const previousSearch = usePrevious<string>(searchText);

  // =========================
  // useEffect
  // =========================

  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: "Janna Alcantara",
        email: "janna@example.com",
        role: "tutor",
        isActive: true,
      },
    ];

    const mockSessions: Session[] = [
      {
        id: 1,
        tutorId: 1,
        subject: "Calculus 1",
        durationMinutes: 60,
        ratePerHour: 300,
      },
    ];

    const mockBookings: Booking[] = [
      {
        id: 1,
        sessionId: 1,
        tuteeId: 2,
        status: BookingStatus.Confirmed,
        requestedAt: new Date(),
      },
    ];

    setUsers(mockUsers);
    setSessions(mockSessions);
    setBookings(mockBookings);
  }, []);

  // =========================
  // Event Handlers
  // =========================

  function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setSearchText(event.target.value);
  }

  function handleSelectUser(id: number): void {
    console.log("Selected user:", id);
  }

  function handleBookSession(sessionId: number): void {
    console.log("Booked session:", sessionId);
  }

  function focusSearchInput(): void {
    searchInputRef.current?.focus();
  }

  // =========================
  // Dynamic Filtering
  // =========================

  const filteredUsers: User[] = users.filter((user: User) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Peer Tutoring Platform</h1>

      <div>
        <h2>Search Student</h2>

        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search by name..."
          value={searchText}
          onChange={handleSearchChange}
        />

        <button onClick={focusSearchInput}>
          Focus Search
        </button>
      </div>

      <div>
        <button onClick={toggleInfo}>
          {showInfo ? "Hide Information" : "Show Information"}
        </button>

        {showInfo && (
          <p>
            This peer tutoring platform helps students find tutoring
            sessions and manage their bookings.
          </p>
        )}
      </div>

      <p>
        Previous search: {previousSearch || "None"}
      </p>

      <h2>Users</h2>

      {filteredUsers.length > 0 ? (
        filteredUsers.map((user: User) => (
          <UserCard
            key={user.id}
            user={user}
            onSelect={handleSelectUser}
          />
        ))
      ) : (
        <p>No users found.</p>
      )}

      <h2>Sessions</h2>

      {sessions.map((session: Session) => (
        <SessionCard
          key={session.id}
          session={session}
          onBook={handleBookSession}
        />
      ))}

      <h2>Booking Status</h2>

      {bookings.map((booking: Booking) => (
        <BookingBadge
          key={booking.id}
          booking={booking}
        />
      ))}
    </div>
  );
}

export default App;