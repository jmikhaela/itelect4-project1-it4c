import { z } from "zod";

export const bookingSchema = z
  .object({
    time: z
      .string()
      .min(1, "Please select a preferred time.")
      .refine(
        (value) =>
          [
            "09:00 AM",
            "10:00 AM",
            "11:00 AM",
            "01:00 PM",
            "02:00 PM",
            "03:00 PM",
            "04:00 PM",
          ].includes(value),
        {
          message: "Please select a valid time.",
        }
      ),

    durationMinutes: z
      .number()
      .min(30, "Duration must be at least 30 minutes.")
      .max(120, "Duration cannot exceed 120 minutes."),
  })
  .refine(
    (data) => data.durationMinutes % 30 === 0,
    {
      message: "Duration must be in 30-minute increments.",
      path: ["durationMinutes"],
    }
  );

export type BookingFormData = z.infer<typeof bookingSchema>;