// ===== Type aliases, unions =====
export type ID = number | string;
export type StringOrNumber = string | number;
export type AvailabilityStatus = "available" | "busy" | "offline";

// ===== GT1 Part 2: Enums =====
// Regular enum -- exists at runtime; supports reverse mapping and looping.
// Booking is the entity with the multi-step status lifecycle.
export enum BookingStatus {
  Requested,
  Confirmed,
  Completed,
}

// ===== GT1 Part 1: Core Interfaces =====
export interface User {
  id: number;
  name: string;
  email: string;
  role: "tutor" | "tutee";
  isActive: boolean;
}

export interface Session {
  id: number;
  tutorId: number;
  subject: string;
  durationMinutes: number;
  ratePerHour: number;
}

export interface Booking {
  id: ID;
  sessionId: number;
  tuteeId: number;
  status: BookingStatus;
  requestedAt: Date | string;
  time: string;
  durationMinutes: number;
}





// Intersection type
export type TutorWithSessions = User & {
  sessions: Session[];
  rating: number;
};

// ===== GT1 Part 2: Generic Interface =====
// ApiResponse<T> can wrap ANY data type -- every future GT reuses this
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== GT1 Part 2: Utility Types =====
// Partial<T> -- update payload only needs the changed fields
export type UserUpdate = Partial<User>;

// Pick<T, K> -- a lightweight preview using only selected fields
export type BookingPreview = Pick<Booking, "id" | "status" | "requestedAt">;

// Omit<T, K> -- safe to expose publicly (no email, no isActive)
export type PublicUser = Omit<User, "email" | "isActive">;

// Record<K, T> -- a fixed set of keys, each mapped to the same value type
export type RoleCount = Record<"tutor" | "tutee", number>;