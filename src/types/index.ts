// ===== Type aliases, unions =====
export type ID = number | string;
export type StringOrNumber = string | number;
export type AvailabilityStatus = "available" | "busy" | "offline";

// ===== GT1 Part 2: Enums =====
export enum BookingStatus {
  Requested,
  Confirmed,
  Completed,
}

// ===== Core Interfaces =====
export interface User {
  id: number | string;
  name: string;
  email: string;
  role?: "tutor" | "tutee";
  isActive?: boolean;
}

export interface Session {
  id: number | string;
  tutorId?: number | string;
  subject: string;
  durationMinutes: number;
  ratePerHour: number;
  title?: string;
  description?: string;
}

export interface Booking {
  id: ID;
  sessionId: number | string;
  tuteeId?: number | string;
  status?: BookingStatus | string;
  requestedAt?: Date | string;
  time: string;
  durationMinutes: number;
}

// Course interface from Session 10
export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  repoUrl: string;
  submittedAt: string;
}

// ===== Session 10: Corrected Derived Types =====
// The API fills in the owner and timestamp, so sending either one is at best ignored.
export type ApiSubmission = Omit<
  Submission,
  "id" | "studentId" | "submittedAt"
> & {
  id: string;
  studentId: string;
  submittedAt: string;
};

export type NewSubmission = Pick<Submission, "courseCode" | "repoUrl">;

export type ApiBooking = Omit<
  Booking,
  "id" | "tuteeId" | "requestedAt"
> & {
  id: string;
  tuteeId?: string;
  requestedAt?: string;
};

export type NewBooking = Pick<Booking, "sessionId" | "time" | "durationMinutes">;

export type ApiUser = Omit<User, "id"> & {
  id: string;
};

export interface AuthReply {
  token: string;
  user: ApiUser;
}

// Intersection type
export type TutorWithSessions = User & {
  sessions: Session[];
  rating: number;
};

// Generic Interface
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Utility Types
export type UserUpdate = Partial<User>;
export type BookingPreview = Pick<Booking, "id" | "status" | "requestedAt">;
export type PublicUser = Omit<User, "email" | "isActive">;
export type RoleCount = Record<"tutor" | "tutee", number>;
