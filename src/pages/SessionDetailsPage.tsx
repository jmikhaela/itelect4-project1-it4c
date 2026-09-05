import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createBooking, fetchSessionById } from "../api/client";
import useBookingStore from "../store/bookingStore";
import type { Session, User } from "../types/index";
import {
  bookingSchema,
  type BookingFormData,
} from "../schemas/bookingSchema";

function SessionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const sessionId = Number(id);

  const addBooking = useBookingStore((state) => state.addBooking);

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      time: "09:00 AM",
      durationMinutes: 60,
    },
  });

  const durationMinutes = watch("durationMinutes");

  const totalPrice = session
    ? (session.ratePerHour * (durationMinutes || 0)) / 60
    : 0;

  const bookingMutation = useMutation({
    mutationFn: (data: BookingFormData) =>
      createBooking({
        sessionId,
        tuteeId: 2,
        time: data.time,
        durationMinutes: data.durationMinutes,
      }),

    onSuccess: (booking) => {
      addBooking(booking);
      navigate("/bookings");
    },
  });

  const onSubmit = (data: BookingFormData) => {
    bookingMutation.mutate(data);
  };

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

            <Button
              type="button"
              onClick={() => navigate("/sessions")}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              ← Back to Sessions
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">

        {/* Back Button */}
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate("/sessions")}
          className="mb-6 font-semibold text-blue-600 transition hover:bg-transparent hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Sessions
        </Button>

        {/* Session Details */}
        <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                Tutoring Session
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {session.subject}
              </h1>

              <p className="mt-3 text-slate-500 dark:text-slate-400">
                One-on-one tutoring session with an experienced tutor.
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 px-5 py-4 text-center dark:bg-blue-950/40">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Rate
              </p>

              <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                ₱{session.ratePerHour.toFixed(2)}
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                per hour
              </p>
            </div>
          </div>

          {/* Tutor */}
          <div className="mt-8 rounded-xl bg-slate-50 p-5 dark:bg-slate-800">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Tutor
            </p>

            <div className="mt-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {tutor.name}
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {tutor.email}
              </p>
            </div>
          </div>

          {/* Session Information */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Default Duration
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                {session.durationMinutes} minutes
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Session Status
              </p>

              <p className="mt-1 text-lg font-bold text-green-600 dark:text-green-400">
                Available
              </p>
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

            {/* Booking Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >

              {/* Time */}
              <div className="mt-6">
                <Label
                  htmlFor="time"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Preferred Time
                </Label>

                <Input
                  id="time"
                  type="text"
                  placeholder="Example: 09:00 AM"
                  {...register("time")}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />

                {errors.time && (
                  <p className="mt-2 text-sm font-medium text-red-600">
                    {errors.time.message}
                  </p>
                )}
              </div>

              {/* Duration */}
              <div className="mt-5">
                <Label
                  htmlFor="durationMinutes"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Duration
                </Label>

                <Input
                  id="durationMinutes"
                  type="number"
                  min="30"
                  max="120"
                  step="30"
                  {...register("durationMinutes", {
                    valueAsNumber: true,
                  })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />

                {errors.durationMinutes && (
                  <p className="mt-2 text-sm font-medium text-red-600">
                    {errors.durationMinutes.message}
                  </p>
                )}
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
              <Button
                type="submit"
                disabled={bookingMutation.isPending}
                className="mt-6 w-full rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {bookingMutation.isPending
                  ? "Booking..."
                  : "Confirm Booking →"}
              </Button>

              {/* Mutation Error */}
              {bookingMutation.isError && (
                <p className="mt-3 text-sm font-medium text-red-600">
                  Failed to create booking. Please make sure JSON Server is
                  running.
                </p>
              )}

            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SessionDetailsPage;