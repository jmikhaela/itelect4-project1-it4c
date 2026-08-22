import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { createBooking, fetchSessionById } from "../api/client";
import useBookingStore from "../store/bookingStore";
import type { Session, User } from "../types/index";

function SessionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const sessionId = Number(id);

  const [time, setTime] = useState("09:00 AM");
  const [durationMinutes, setDurationMinutes] = useState(60);

  const addBooking = useBookingStore(
    (state) => state.addBooking
  );

  const {
    data: session,
    isLoading,
    isError,
    error,
  } = useQuery<Session, Error>({
    queryKey: ["sessions", sessionId],
    queryFn: () => fetchSessionById(sessionId),
    enabled: Number.isFinite(sessionId),
  });

  const tutor: User = {
    id: 1,
    name: "Janna Mikhaela",
    email: "janna.mikhaela@example.com",
    role: "tutor",
    isActive: true,
  };

  const bookingMutation = useMutation({
    mutationFn: () =>
      createBooking({
        sessionId,
        tuteeId: 2,
        time,
        durationMinutes,
      }),

    onSuccess: (booking) => {
      addBooking(
        booking.sessionId,
        booking.tuteeId,
        booking.time,
        booking.durationMinutes
      );

      navigate("/bookings");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-slate-900">
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
              Loading session details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !session) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <div className="text-5xl">⚠️</div>

            <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
              Session Not Found
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {isError
                ? error.message
                : "The tutoring session you are looking for does not exist."}
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
      </div>
    );
  }

  const totalPrice =
    (session.ratePerHour / 60) * durationMinutes;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/sessions")}
          className="mb-6 font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Sessions
        </button>

        {/* Session Information */}
        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <div>
            <p className="font-semibold uppercase tracking-wide text-blue-600">
              Tutoring Session
            </p>

            <h1 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white">
              {session.subject}
            </h1>

            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Book this tutoring session with {tutor.name}.
            </p>
          </div>

          {/* Session Details */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Duration
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                {session.durationMinutes} minutes
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Rate
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                ₱{session.ratePerHour} / hour
              </p>
            </div>
          </div>

          {/* Tutor Information */}
          <div className="mt-10">
            <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
              Tutor Information
            </h2>

            <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                  JM
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
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
            </div>
          </div>

          {/* Booking Section */}
          <div className="mt-10 rounded-2xl bg-blue-50 p-6 dark:bg-blue-950/30">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Book This Session
            </h2>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Select your preferred time and duration.
            </p>

            {/* Time */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Preferred Time
              </label>

              <select
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>01:00 PM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
                <option>04:00 PM</option>
              </select>
            </div>

            {/* Duration */}
            <div className="mt-5">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Duration
              </label>

              <select
                value={durationMinutes}
                onChange={(event) =>
                  setDurationMinutes(Number(event.target.value))
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value={30}>30 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
                <option value={120}>120 minutes</option>
              </select>
            </div>

            {/* Total */}
            <div className="mt-5 rounded-xl bg-white p-4 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Estimated Total
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                ₱{totalPrice.toFixed(2)}
              </p>
            </div>

            {/* Confirm */}
            <button
              type="button"
              onClick={() => bookingMutation.mutate()}
              disabled={bookingMutation.isPending}
              className="mt-6 w-full rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {bookingMutation.isPending
                ? "Booking..."
                : "Confirm Booking →"}
            </button>

            {bookingMutation.isError && (
              <p className="mt-3 text-sm font-medium text-red-600">
                Failed to create booking. Please make sure JSON
                Server is running.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default SessionDetailsPage;