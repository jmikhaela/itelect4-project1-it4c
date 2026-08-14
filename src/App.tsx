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

  // Dark mode
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Selected user
  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  // =========================
  // useRef
  // =========================

  const searchInputRef =
    useRef<HTMLInputElement>(null);

  // =========================
  // Custom Hooks
  // =========================

  const [showInfo, toggleInfo] = useToggle(false);

  const previousSearch =
    usePrevious<string>(searchText);

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

    setUsers(mockUsers);
    setSessions(mockSessions);
    setBookings([]);
  }, []);

  // =========================
  // EVENT HANDLERS
  // =========================

  function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setSearchText(event.target.value);
  }

  // View Profile
  function handleSelectUser(id: number): void {
    const user = users.find(
      (currentUser) => currentUser.id === id
    );

    if (user) {
      setSelectedUser(user);
    }
  }

  // Close Profile
  function handleCloseProfile(): void {
    setSelectedUser(null);
  }

  // Book Session
  function handleBookSession(sessionId: number): void {
    const existingBooking = bookings.find(
      (booking) =>
        booking.sessionId === sessionId
    );

    // Prevent duplicate booking
    if (existingBooking) {
      return;
    }

    const newBooking: Booking = {
      id: bookings.length + 1,
      sessionId: sessionId,
      tuteeId: 2,
      status: BookingStatus.Confirmed,
      requestedAt: new Date(),
    };

    setBookings((currentBookings) => [
      ...currentBookings,
      newBooking,
    ]);
  }

  // Focus search
  function focusSearchInput(): void {
    searchInputRef.current?.focus();
  }

  // =========================
  // FILTER USERS
  // =========================

  const filteredUsers: User[] =
    users.filter((user: User) =>
      user.name
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

  // =========================
  // UI
  // =========================

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-gray-900 p-6 text-white transition-colors duration-300"
          : "min-h-screen bg-gray-100 p-6 text-gray-900 transition-colors duration-300"
      }
    >
      <div className="mx-auto max-w-6xl">

        {/* =========================
            HEADER
        ========================= */}

        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div>
            <h1
              className={
                darkMode
                  ? "text-4xl font-bold text-blue-400"
                  : "text-4xl font-bold text-blue-700"
              }
            >
              Peer Tutoring Platform
            </h1>

            <p
              className={
                darkMode
                  ? "mt-2 text-gray-300"
                  : "mt-2 text-gray-600"
              }
            >
              Find tutoring sessions and manage
              your bookings.
            </p>
          </div>

          {/* DARK MODE BUTTON */}

          <button
            type="button"
            onClick={() =>
              setDarkMode(
                (currentMode) => !currentMode
              )
            }
            className={
              darkMode
                ? "rounded-lg bg-gray-700 px-5 py-2 font-medium text-white transition hover:bg-gray-600"
                : "rounded-lg bg-gray-800 px-5 py-2 font-medium text-white transition hover:bg-gray-700"
            }
          >
            {darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}
          </button>

        </header>

        {/* =========================
            SEARCH
        ========================= */}

        <section
          className={
            darkMode
              ? "mb-6 rounded-xl bg-gray-800 p-6 shadow-md"
              : "mb-6 rounded-xl bg-white p-6 shadow-md"
          }
        >
          <h2
            className={
              darkMode
                ? "mb-4 text-2xl font-semibold text-white"
                : "mb-4 text-2xl font-semibold text-gray-800"
            }
          >
            Search Student
          </h2>

          <div className="flex flex-col gap-3 sm:flex-row">

            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by name..."
              value={searchText}
              onChange={handleSearchChange}
              className={
                darkMode
                  ? "flex-1 rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  : "flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }
            />

            <button
              type="button"
              onClick={focusSearchInput}
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
            >
              Focus Search
            </button>

          </div>
        </section>

        {/* =========================
            INFORMATION
        ========================= */}

        <section
          className={
            darkMode
              ? "mb-6 rounded-xl bg-gray-800 p-6 shadow-md"
              : "mb-6 rounded-xl bg-white p-6 shadow-md"
          }
        >
          <button
            type="button"
            onClick={toggleInfo}
            className="rounded-lg bg-gray-800 px-5 py-2 font-medium text-white transition hover:bg-gray-700"
          >
            {showInfo
              ? "Hide Information"
              : "Show Information"}
          </button>

          {showInfo && (
            <p
              className={
                darkMode
                  ? "mt-4 rounded-lg bg-blue-950 p-4 text-gray-200"
                  : "mt-4 rounded-lg bg-blue-50 p-4 text-gray-700"
              }
            >
              This peer tutoring platform helps
              students find tutoring sessions and
              manage their bookings.
            </p>
          )}
        </section>

        {/* =========================
            PREVIOUS SEARCH
        ========================= */}

        <p
          className={
            darkMode
              ? "mb-8 text-gray-300"
              : "mb-8 text-gray-600"
          }
        >
          Previous search:{" "}
          <span
            className={
              darkMode
                ? "font-semibold text-white"
                : "font-semibold text-gray-900"
            }
          >
            {previousSearch || "None"}
          </span>
        </p>

        {/* =========================
            SELECTED USER PROFILE
        ========================= */}

        {selectedUser && (
          <section
            className={
              darkMode
                ? "mb-8 rounded-xl bg-gray-800 p-6 shadow-md"
                : "mb-8 rounded-xl bg-white p-6 shadow-md"
            }
          >
            <div className="flex items-center justify-between">

              <h2
                className={
                  darkMode
                    ? "text-2xl font-bold text-white"
                    : "text-2xl font-bold text-gray-800"
                }
              >
                Student Profile
              </h2>

              <button
                type="button"
                onClick={handleCloseProfile}
                className={
                  darkMode
                    ? "rounded-lg bg-gray-700 px-4 py-2 font-medium text-white hover:bg-gray-600"
                    : "rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
                }
              >
                Close
              </button>

            </div>

            <div
              className={
                darkMode
                  ? "mt-5 rounded-lg bg-gray-700 p-5 text-gray-200"
                  : "mt-5 rounded-lg bg-gray-50 p-5 text-gray-700"
              }
            >
              <h3 className="text-xl font-bold text-blue-500">
                {selectedUser.name}
              </h3>

              <p className="mt-2">
                <span className="font-semibold">
                  Email:
                </span>{" "}
                {selectedUser.email}
              </p>

              <p>
                <span className="font-semibold">
                  Role:
                </span>{" "}
                {selectedUser.role}
              </p>

              <p>
                <span className="font-semibold">
                  Status:
                </span>{" "}
                {selectedUser.isActive
                  ? "Active"
                  : "Inactive"}
              </p>
            </div>
          </section>
        )}

        {/* =========================
            USERS
        ========================= */}

        <section className="mb-10">

          <h2
            className={
              darkMode
                ? "mb-4 text-2xl font-bold text-white"
                : "mb-4 text-2xl font-bold text-gray-800"
            }
          >
            Users
          </h2>

          {filteredUsers.length > 0 ? (

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {filteredUsers.map(
                (user: User) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onSelect={handleSelectUser}
                  />
                )
              )}

            </div>

          ) : (

            <div
              className={
                darkMode
                  ? "rounded-xl bg-gray-800 p-6 text-center shadow-md"
                  : "rounded-xl bg-white p-6 text-center shadow-md"
              }
            >
              <p
                className={
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }
              >
                No users found.
              </p>
            </div>

          )}

        </section>

        {/* =========================
            SESSIONS
        ========================= */}

        <section className="mb-10">

          <h2
            className={
              darkMode
                ? "mb-4 text-2xl font-bold text-white"
                : "mb-4 text-2xl font-bold text-gray-800"
            }
          >
            Sessions
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {sessions.map(
              (session: Session) => {

                const isBooked =
                  bookings.some(
                    (booking) =>
                      booking.sessionId ===
                      session.id
                  );

                return (
                  <SessionCard
                    key={session.id}
                    session={session}
                    onBook={handleBookSession}
                    isBooked={isBooked}
                  />
                );
              }
            )}

          </div>
        </section>

        {/* =========================
            BOOKING STATUS
        ========================= */}

        <section className="mb-10">

          <h2
            className={
              darkMode
                ? "mb-4 text-2xl font-bold text-white"
                : "mb-4 text-2xl font-bold text-gray-800"
            }
          >
            Booking Status
          </h2>

          {bookings.length > 0 ? (

            <div className="flex flex-wrap gap-4">

              {bookings.map(
                (booking: Booking) => (
                  <BookingBadge
                    key={booking.id}
                    booking={booking}
                  />
                )
              )}

            </div>

          ) : (

            <div
              className={
                darkMode
                  ? "rounded-xl bg-gray-800 p-6 shadow-md"
                  : "rounded-xl bg-white p-6 shadow-md"
              }
            >
              <p
                className={
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }
              >
                No bookings yet. Book a session
                to see your booking status.
              </p>
            </div>

          )}

        </section>

      </div>
    </div>
  );
}

export default App;